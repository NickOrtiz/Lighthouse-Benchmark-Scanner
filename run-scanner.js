#!/usr/bin/env node

// Simple wrapper to run the scanner with visible output
const { main } = require('./src/index.js');

console.log('🚀 Starting Performance Scanner...\n');

main()
  .then(() => {
    console.log('\n✅ Scanner completed successfully!');
    console.log('📊 Check the lighthouse-results/ directory for your reports.');
  })
  .catch((error) => {
    console.error('\n❌ Scanner failed:', error.message);
    process.exit(1);
  });
