// Reporting module index
const { resultsToCSV } = require('./csv-generator');
const { generateSummary } = require('./summary-generator');

module.exports = {
  resultsToCSV,
  generateSummary
};
