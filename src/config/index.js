// Main configuration for Lighthouse Scanner
const CONFIG = {
  runsPerUrl: 3,
  outputDir: './lighthouse-results',
  timestamp: new Date().toISOString().split('T')[0],
  testBothDevices: true, // Test both mobile and desktop
  includeSecurityHeaders: true,
  includeCarbonFootprint: true,
  includeWebPageTest: false, // Set to true if you have WPT API key
  webPageTestApiKey: process.env.WPT_API_KEY || '' // Set as environment variable
};

module.exports = CONFIG;
