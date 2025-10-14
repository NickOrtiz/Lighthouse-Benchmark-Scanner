const { runLighthouse } = require('./runner');
const { averageResults } = require('./result-processor');
const { checkSecurityHeaders, estimateCarbonFootprint, analyzeCoverage } = require('../utils');
const CONFIG = require('../config');

// Run multiple tests and average results
async function testUrl(url, siteName, pageType, chrome, siteType) {
  console.log(`\n Testing ${siteName} - ${pageType}: ${url}`);
  
  const deviceTests = CONFIG.testBothDevices ? ['mobile', 'desktop'] : ['mobile'];
  const deviceResults = {};
  
  for (const device of deviceTests) {
    console.log(`  📱 Testing ${device}...`);
    const results = [];
    
    for (let i = 1; i <= CONFIG.runsPerUrl; i++) {
      console.log(`    Run ${i}/${CONFIG.runsPerUrl}...`);
      try {
        const result = await runLighthouse(url, chrome, device);
        results.push(result);
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`    ❌ Error on run ${i}:`, error.message);
      }
    }
    
    if (results.length > 0) {
      deviceResults[device] = averageResults(results);
    }
  }
  
  // Additional analyses (run once)
  console.log('  🔍 Running additional analyses...');
  
  const [securityHeaders, coverage] = await Promise.all([
    CONFIG.includeSecurityHeaders ? checkSecurityHeaders(url) : null,
    analyzeCoverage(url)
  ]);
  
  const mobileResult = deviceResults.mobile;
  const desktopResult = deviceResults.desktop;
  
  // Calculate mobile vs desktop gap
  const performanceGap = desktopResult && mobileResult 
    ? desktopResult.scores.performance - mobileResult.scores.performance 
    : 0;
  
  // Carbon footprint
  const carbon = CONFIG.includeCarbonFootprint && mobileResult
    ? await estimateCarbonFootprint(mobileResult.resources.totalBytes)
    : null;
  
  return {
    site: siteName,
    type: siteType,
    pageType: pageType,
    url: url,
    mobile: mobileResult,
    desktop: desktopResult,
    performanceGap: performanceGap,
    securityHeaders: securityHeaders,
    coverage: coverage,
    carbon: carbon,
    timestamp: CONFIG.timestamp
  };
}

module.exports = {
  testUrl
};
