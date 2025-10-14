// Example: Custom test using the modular structure
const { testUrl } = require('../src/lighthouse');
const { resultsToCSV } = require('../src/reporting');
const chromeLauncher = require('chrome-launcher');

async function customTest() {
  console.log('Running custom test...');
  
  // Launch Chrome
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  
  try {
    // Test a single URL
    const result = await testUrl(
      'https://example.com',
      'Example Site',
      'homepage',
      chrome,
      'own'
    );
    
    console.log('Test completed:', result);
    
    // Generate CSV for this single result
    const csv = resultsToCSV([result]);
    console.log('\nCSV Output:');
    console.log(csv);
    
  } finally {
    await chrome.kill();
  }
}

// Run if called directly
if (require.main === module) {
  customTest().catch(console.error);
}

module.exports = { customTest };
