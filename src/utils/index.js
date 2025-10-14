// Utility functions index
const { checkSecurityHeaders } = require('./security-headers');
const { estimateCarbonFootprint } = require('./carbon-footprint');
const { analyzeCoverage } = require('./coverage-analysis');

module.exports = {
  checkSecurityHeaders,
  estimateCarbonFootprint,
  analyzeCoverage
};
