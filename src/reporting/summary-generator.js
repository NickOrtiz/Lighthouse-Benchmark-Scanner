// Generate summary report
function generateSummary(results) {
  const mobileResults = results.filter(r => r.mobile);
  
  const avgPerformance = mobileResults.reduce((sum, r) => sum + r.mobile.scores.performance, 0) / mobileResults.length;
  const avgAccessibility = mobileResults.reduce((sum, r) => sum + r.mobile.scores.accessibility, 0) / mobileResults.length;
  const avgSEO = mobileResults.reduce((sum, r) => sum + r.mobile.scores.seo, 0) / mobileResults.length;
  
  const ownSites = results.filter(r => r.type === 'own');
  const competitors = results.filter(r => r.type === 'competitor');
  
  const avgOwnPerformance = ownSites.reduce((sum, r) => sum + (r.mobile?.scores.performance || 0), 0) / ownSites.length;
  const avgCompetitorPerformance = competitors.reduce((sum, r) => sum + (r.mobile?.scores.performance || 0), 0) / competitors.length;
  
  return {
    totalSites: new Set(results.map(r => r.site)).size,
    totalUrls: results.length,
    averages: {
      performance: Math.round(avgPerformance),
      accessibility: Math.round(avgAccessibility),
      seo: Math.round(avgSEO)
    },
    comparison: {
      ownSites: Math.round(avgOwnPerformance),
      competitors: Math.round(avgCompetitorPerformance),
      difference: Math.round(avgOwnPerformance - avgCompetitorPerformance)
    }
  };
}

module.exports = {
  generateSummary
};
