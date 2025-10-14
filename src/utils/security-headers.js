const axios = require('axios');

// Check security headers
async function checkSecurityHeaders(url) {
  try {
    const response = await axios.get(url, {
      maxRedirects: 5,
      timeout: 10000,
      validateStatus: () => true
    });
    
    const headers = response.headers;
    const securityHeaders = {
      'strict-transport-security': !!headers['strict-transport-security'],
      'content-security-policy': !!headers['content-security-policy'],
      'x-frame-options': !!headers['x-frame-options'],
      'x-content-type-options': !!headers['x-content-type-options'],
      'referrer-policy': !!headers['referrer-policy'],
      'permissions-policy': !!headers['permissions-policy']
    };
    
    const score = Object.values(securityHeaders).filter(Boolean).length;
    
    return {
      score: score,
      total: 6,
      headers: securityHeaders
    };
  } catch (error) {
    console.warn(`  ⚠️  Could not check security headers: ${error.message}`);
    return { score: 0, total: 6, headers: {} };
  }
}

module.exports = {
  checkSecurityHeaders
};
