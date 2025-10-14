// Enhanced Lighthouse Site Benchmark Scanner
// Main entry point

const chromeLauncher = require('chrome-launcher');
const fs = require('fs').promises;
const path = require('path');

// Import modules
const CONFIG = require('./config');
const { loadSitesConfig } = require('./config/sites-loader');
const { testUrl } = require('./lighthouse');
const { resultsToCSV, generateSummary } = require('./reporting');

// Main execution
async function main() {
  console.log('🚀 Enhanced Lighthouse Benchmark Scanner\n');
  console.log(`Testing: ${CONFIG.testBothDevices ? 'Mobile + Desktop' : 'Mobile only'}`);
  console.log(`Runs per URL: ${CONFIG.runsPerUrl}\n`);
  
  // Create output directory
  await fs.mkdir(CONFIG.outputDir, { recursive: true });
  
  // Load configuration
  const config = await loadSitesConfig();
  console.log(`Loaded ${config.sites.length} sites to test\n`);
  
  // Launch Chrome
  console.log('Launching Chrome...');
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  
  const allResults = [];
  
  try {
    // Test each site
    for (const site of config.sites) {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`Testing: ${site.name} (${site.type})`);
      console.log('='.repeat(60));
      
      for (const [pageType, url] of Object.entries(site.urls)) {
        try {
          const result = await testUrl(url, site.name, pageType, chrome, site.type);
          allResults.push(result);
        } catch (error) {
          console.error(`❌ Failed to test ${pageType}:`, error.message);
        }
      }
    }
    
    // Save results
    const csvOutput = resultsToCSV(allResults);
    const csvPath = path.join(CONFIG.outputDir, `benchmark-${CONFIG.timestamp}.csv`);
    await fs.writeFile(csvPath, csvOutput);
    console.log(`\n✅ CSV saved to: ${csvPath}`);
    
    const jsonPath = path.join(CONFIG.outputDir, `benchmark-${CONFIG.timestamp}.json`);
    await fs.writeFile(jsonPath, JSON.stringify(allResults, null, 2));
    console.log(`✅ JSON saved to: ${jsonPath}`);
    
    // Summary
    const summary = generateSummary(allResults);
    console.log('\n' + '='.repeat(60));
    console.log('SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total sites tested: ${summary.totalSites}`);
    console.log(`Total URLs tested: ${summary.totalUrls}`);
    console.log(`\nAverage Scores:`);
    console.log(`  Performance: ${summary.averages.performance}`);
    console.log(`  Accessibility: ${summary.averages.accessibility}`);
    console.log(`  SEO: ${summary.averages.seo}`);
    console.log(`\nYour Sites vs Competitors:`);
    console.log(`  Your avg: ${summary.comparison.ownSites}`);
    console.log(`  Competitor avg: ${summary.comparison.competitors}`);
    console.log(`  Difference: ${summary.comparison.difference > 0 ? '+' : ''}${summary.comparison.difference}`);
    
  } finally {
    await chrome.kill();
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  main
};
