const puppeteer = require('puppeteer');

// Analyze CSS/JS coverage using Puppeteer
async function analyzeCoverage(url) {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    await Promise.all([
      page.coverage.startJSCoverage(),
      page.coverage.startCSSCoverage()
    ]);
    
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    
    const [jsCoverage, cssCoverage] = await Promise.all([
      page.coverage.stopJSCoverage(),
      page.coverage.stopCSSCoverage()
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
    if (browser) await browser.close();
    return {
      js: { totalKB: 0, unusedKB: 0, unusedPercent: 0 },
      css: { totalKB: 0, unusedKB: 0, unusedPercent: 0 }
    };
  }
}

module.exports = {
  analyzeCoverage
};
