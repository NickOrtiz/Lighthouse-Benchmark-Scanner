// Count specific issue types from Lighthouse audits
function countIssues(lhr) {
  const issues = {
    performance: 0,
    accessibility: 0,
    seo: 0,
    bestPractices: 0
  };
  
  for (const [auditId, audit] of Object.entries(lhr.audits)) {
    if (audit.score !== null && audit.score < 1) {
      // Map audits to categories (simplified)
      if (lhr.categories.performance.auditRefs.find(ref => ref.id === auditId)) {
        issues.performance++;
      }
      if (lhr.categories.accessibility.auditRefs.find(ref => ref.id === auditId)) {
        issues.accessibility++;
      }
      if (lhr.categories.seo.auditRefs.find(ref => ref.id === auditId)) {
        issues.seo++;
      }
      if (lhr.categories['best-practices'].auditRefs.find(ref => ref.id === auditId)) {
        issues.bestPractices++;
      }
    }
  }
  
  return issues;
}

// Analyze image formats
function analyzeImageFormats(lhr) {
  const imageAudit = lhr.audits['modern-image-formats'];
  const formats = {
    modernFormatsUsed: imageAudit?.score === 1,
    potentialSavingsKB: imageAudit?.details?.overallSavingsBytes 
      ? Math.round(imageAudit.details.overallSavingsBytes / 1024) 
      : 0,
    totalImages: imageAudit?.details?.items?.length || 0
  };
  
  return formats;
}

// Get network request count
function getRequestCount(lhr) {
  const networkRequests = lhr.audits['network-requests'];
  return networkRequests?.details?.items?.length || 0;
}

// Average multiple Lighthouse results
function averageResults(results) {
  const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
  
  const performanceScores = results.map(r => r.categories.performance.score * 100);
  const accessibilityScores = results.map(r => r.categories.accessibility.score * 100);
  const seoScores = results.map(r => r.categories.seo.score * 100);
  const bestPracticesScores = results.map(r => r.categories['best-practices'].score * 100);
  
  // Core Web Vitals
  const lcpValues = results.map(r => r.audits['largest-contentful-paint'].numericValue);
  const clsValues = results.map(r => r.audits['cumulative-layout-shift'].numericValue);
  const tbtValues = results.map(r => r.audits['total-blocking-time'].numericValue);
  
  // Additional metrics
  const fcp = results.map(r => r.audits['first-contentful-paint'].numericValue);
  const si = results.map(r => r.audits['speed-index'].numericValue);
  const tti = results.map(r => r.audits['interactive'].numericValue);
  
  // Resource stats
  const totalBytes = results.map(r => r.audits['total-byte-weight'].numericValue);
  const requestCounts = results.map(r => getRequestCount(r));
  
  // Get resource breakdown from first result
  const firstResult = results[0];
  const resourceItems = firstResult.audits['total-byte-weight']?.details?.items || [];
  
  const jsBytes = resourceItems
    .filter(item => item.resourceType === 'script')
    .reduce((sum, item) => sum + (item.transferSize || 0), 0);
  
  const imageBytes = resourceItems
    .filter(item => item.resourceType === 'image')
    .reduce((sum, item) => sum + (item.transferSize || 0), 0);
  
  const cssBytes = resourceItems
    .filter(item => item.resourceType === 'stylesheet')
    .reduce((sum, item) => sum + (item.transferSize || 0), 0);
  
  // Issue counts (from first result as representative)
  const issues = countIssues(firstResult);
  
  // Image format analysis
  const imageFormats = analyzeImageFormats(firstResult);
  
  return {
    runsCompleted: results.length,
    scores: {
      performance: Math.round(avg(performanceScores)),
      accessibility: Math.round(avg(accessibilityScores)),
      seo: Math.round(avg(seoScores)),
      bestPractices: Math.round(avg(bestPracticesScores))
    },
    metrics: {
      lcp: Math.round(avg(lcpValues)),
      cls: avg(clsValues).toFixed(3),
      tbt: Math.round(avg(tbtValues)),
      fcp: Math.round(avg(fcp)),
      speedIndex: Math.round(avg(si)),
      tti: Math.round(avg(tti))
    },
    resources: {
      totalBytes: Math.round(avg(totalBytes)),
      totalKB: Math.round(avg(totalBytes) / 1024),
      requestCount: Math.round(avg(requestCounts)),
      jsKB: Math.round(jsBytes / 1024),
      cssKB: Math.round(cssBytes / 1024),
      imageKB: Math.round(imageBytes / 1024)
    },
    issues: issues,
    imageFormats: imageFormats
  };
}

module.exports = {
  countIssues,
  analyzeImageFormats,
  getRequestCount,
  averageResults
};
