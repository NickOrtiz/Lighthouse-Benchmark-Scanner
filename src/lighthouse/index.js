// Lighthouse testing module index
const { runLighthouse } = require('./runner');
const { countIssues, analyzeImageFormats, getRequestCount, averageResults } = require('./result-processor');
const { testUrl } = require('./tester');

module.exports = {
  runLighthouse,
  countIssues,
  analyzeImageFormats,
  getRequestCount,
  averageResults,
  testUrl
};
