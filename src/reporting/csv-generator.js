// Convert results to CSV
function resultsToCSV(results) {
  const headers = [
    'Site', 'Type', 'Page Type', 'URL',
    // Mobile Performance
    'Mobile Performance', 'Mobile Accessibility', 'Mobile SEO', 'Mobile Best Practices',
    'Mobile LCP (ms)', 'Mobile CLS', 'Mobile TBT (ms)', 'Mobile FCP (ms)', 'Mobile TTI (ms)',
    // Desktop Performance (if tested)
    'Desktop Performance', 'Desktop Accessibility', 'Desktop SEO', 'Desktop Best Practices',
    'Desktop LCP (ms)', 'Desktop CLS', 'Desktop TBT (ms)',
    // Performance Gap
    'Mobile/Desktop Gap',
    // Resources
    'Total Size (KB)', 'Requests', 'JS Size (KB)', 'CSS Size (KB)', 'Image Size (KB)',
    // Coverage Analysis
    'Unused JS (KB)', 'Unused JS %', 'Unused CSS (KB)', 'Unused CSS %',
    // Issues
    'Performance Issues', 'A11y Issues', 'SEO Issues', 'Best Practice Issues',
    // Image Optimization
    'Modern Image Formats', 'Image Savings (KB)', 'Total Images',
    // Security
    'Security Headers Score',
    // Carbon
    'CO2 (grams)', 'Carbon Rating',
    // Meta
    'Test Date'
  ].join(',');
  
  const rows = results.map(r => {
    const m = r.mobile;
    const d = r.desktop;
    
    return [
      `"${r.site}"`,
      r.type,
      r.pageType,
      `"${r.url}"`,
      // Mobile
      m?.scores.performance || '',
      m?.scores.accessibility || '',
      m?.scores.seo || '',
      m?.scores.bestPractices || '',
      m?.metrics.lcp || '',
      m?.metrics.cls || '',
      m?.metrics.tbt || '',
      m?.metrics.fcp || '',
      m?.metrics.tti || '',
      // Desktop
      d?.scores.performance || '',
      d?.scores.accessibility || '',
      d?.scores.seo || '',
      d?.scores.bestPractices || '',
      d?.metrics.lcp || '',
      d?.metrics.cls || '',
      d?.metrics.tbt || '',
      // Gap
      r.performanceGap || '',
      // Resources
      m?.resources.totalKB || '',
      m?.resources.requestCount || '',
      m?.resources.jsKB || '',
      m?.resources.cssKB || '',
      m?.resources.imageKB || '',
      // Coverage
      r.coverage?.js.unusedKB || '',
      r.coverage?.js.unusedPercent || '',
      r.coverage?.css.unusedKB || '',
      r.coverage?.css.unusedPercent || '',
      // Issues
      m?.issues.performance || '',
      m?.issues.accessibility || '',
      m?.issues.seo || '',
      m?.issues.bestPractices || '',
      // Images
      m?.imageFormats.modernFormatsUsed ? 'Yes' : 'No',
      m?.imageFormats.potentialSavingsKB || '',
      m?.imageFormats.totalImages || '',
      // Security
      r.securityHeaders ? `${r.securityHeaders.score}/${r.securityHeaders.total}` : '',
      // Carbon
      r.carbon?.co2Grams || '',
      r.carbon?.rating || '',
      // Meta
      r.timestamp
    ].join(',');
  });
  
  return [headers, ...rows].join('\n');
}

module.exports = {
  resultsToCSV
};
