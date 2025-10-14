// Lighthouse configuration flags for different devices

// Lighthouse settings for mobile
const mobileLighthouseFlags = {
  logLevel: 'info',
  output: 'json',
  onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  formFactor: 'mobile',
  throttling: {
    rttMs: 40,
    throughputKbps: 10 * 1024,
    cpuSlowdownMultiplier: 1
  },
  screenEmulation: {
    mobile: true,
    width: 375,
    height: 667,
    deviceScaleFactor: 2
  }
};

// Lighthouse settings for desktop
const desktopLighthouseFlags = {
  ...mobileLighthouseFlags,
  formFactor: 'desktop',
  screenEmulation: {
    mobile: false,
    width: 1350,
    height: 940,
    deviceScaleFactor: 1
  },
  throttling: {
    rttMs: 40,
    throughputKbps: 10 * 1024,
    cpuSlowdownMultiplier: 1
  }
};

module.exports = {
  mobileLighthouseFlags,
  desktopLighthouseFlags
};
