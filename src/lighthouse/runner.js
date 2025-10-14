const lighthouse = require('lighthouse');
const { mobileLighthouseFlags, desktopLighthouseFlags } = require('../config/lighthouse-flags');

// Run Lighthouse on a single URL
async function runLighthouse(url, chrome, device = 'mobile') {
  const flags = device === 'mobile' ? mobileLighthouseFlags : desktopLighthouseFlags;
  const options = {
    ...flags,
    port: chrome.port
  };
  
  const runnerResult = await lighthouse(url, options);
  return runnerResult.lhr;
}

module.exports = {
  runLighthouse
};
