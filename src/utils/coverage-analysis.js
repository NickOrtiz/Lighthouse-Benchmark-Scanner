const puppeteer = require('puppeteer');

// Analyze CSS/JS coverage using Puppeteer
async function analyzeCoverage(url) {
  let browser;
  let page;
  
  // Add timeout wrapper
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Coverage analysis timeout')), 60000); // 60 second timeout
  });
  
  const analysisPromise = async () => {
    try {
      browser = await puppeteer.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
      });
      page = await browser.newPage();
      
      // Set a reasonable viewport and user agent
      await page.setViewport({ width: 1280, height: 720 });
      await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      
      // Start coverage before navigation
      await Promise.all([
        page.coverage.startJSCoverage(),
        page.coverage.startCSSCoverage()
      ]);
      
      // Navigate with more conservative settings
      await page.goto(url, { 
        waitUntil: 'domcontentloaded', 
        timeout: 30000 
      });
      
      // Wait a bit for any dynamic content to load
      await page.waitForTimeout(2000);
      
      // Check if page is still valid before stopping coverage
      if (page.isClosed()) {
        throw new Error('Page was closed during analysis');
      }
      
      const [jsCoverage, cssCoverage] = await Promise.all([
        page.coverage.stopJSCoverage().catch(() => []),
        page.coverage.stopCSSCoverage().catch(() => [])
      ]);
    
      const calculateUnusedBytes = (coverage) => {
        return coverage.reduce((total, entry) => {
          const unused = entry.ranges.reduce((sum, range) => sum + (range.end - range.start), 0);
          return total + (entry.text.length - unused);
        }, 0);
      };
      
      const totalJSBytes = jsCoverage.reduce((total, entry) => total + entry.text.length, 0);
      const unusedJSBytes = calculateUnusedBytes(jsCoverage);
      
      const totalCSSBytes = cssCoverage.reduce((total, entry) => total + entry.text.length, 0);
      const unusedCSSBytes = calculateUnusedBytes(cssCoverage);
      
      await browser.close();
      
      return {
        js: {
          totalKB: Math.round(totalJSBytes / 1024),
          unusedKB: Math.round(unusedJSBytes / 1024),
          unusedPercent: totalJSBytes > 0 ? Math.round((unusedJSBytes / totalJSBytes) * 100) : 0
        },
        css: {
          totalKB: Math.round(totalCSSBytes / 1024),
          unusedKB: Math.round(unusedCSSBytes / 1024),
          unusedPercent: totalCSSBytes > 0 ? Math.round((unusedCSSBytes / totalCSSBytes) * 100) : 0
        }
      };
    } catch (error) {
      console.warn(`  ⚠️  Coverage analysis failed: ${error.message}`);
      
      // Safely close browser and page
      try {
        if (page && !page.isClosed()) {
          await page.close();
        }
      } catch (e) {
        // Ignore errors when closing page
      }
      
      try {
        if (browser) {
          await browser.close();
        }
      } catch (e) {
        // Ignore errors when closing browser
      }
      
      return {
        js: { totalKB: 0, unusedKB: 0, unusedPercent: 0 },
        css: { totalKB: 0, unusedKB: 0, unusedPercent: 0 }
      };
    }
  };
  
  // Race between analysis and timeout
  try {
    return await Promise.race([analysisPromise(), timeoutPromise]);
  } catch (error) {
    console.warn(`  ⚠️  Coverage analysis failed: ${error.message}`);
    
    // Safely close browser and page
    try {
      if (page && !page.isClosed()) {
        await page.close();
      }
    } catch (e) {
      // Ignore errors when closing page
    }
    
    try {
      if (browser) {
        await browser.close();
      }
    } catch (e) {
      // Ignore errors when closing browser
    }
    
    return {
      js: { totalKB: 0, unusedKB: 0, unusedPercent: 0 },
      css: { totalKB: 0, unusedKB: 0, unusedPercent: 0 }
    };
  }
}

module.exports = {
  analyzeCoverage
};
