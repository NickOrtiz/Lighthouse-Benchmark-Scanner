# Lighthouse Benchmark Scanner

A comprehensive automated performance testing tool for site benchmarking using Google Lighthouse.

## Project Structure

```
├── src/
│   ├── config/
│   │   ├── index.js              # Main configuration
│   │   ├── lighthouse-flags.js   # Lighthouse device-specific flags
│   │   └── sites-loader.js       # Sites configuration loader
│   ├── utils/
│   │   ├── index.js              # Utility functions index
│   │   ├── security-headers.js   # Security headers checker
│   │   ├── carbon-footprint.js   # Carbon footprint calculator
│   │   └── coverage-analysis.js  # CSS/JS coverage analysis
│   ├── lighthouse/
│   │   ├── index.js              # Lighthouse module index
│   │   ├── runner.js             # Lighthouse test runner
│   │   ├── result-processor.js   # Result processing and averaging
│   │   └── tester.js             # Multi-device testing orchestrator
│   ├── reporting/
│   │   ├── index.js              # Reporting module index
│   │   ├── csv-generator.js      # CSV report generation
│   │   └── summary-generator.js  # Summary statistics
│   └── index.js                  # Main application entry point
├── index.js                      # Root entry point
├── run-scanner.js               # Recommended runner with progress output
├── sites-config.json            # Site configuration (created automatically)
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

## Features

- **Multi-device Testing**: Test both mobile and desktop performance
- **Multiple Runs**: Average results across multiple test runs for accuracy
- **Comprehensive Metrics**: Performance, Accessibility, SEO, and Best Practices
- **Additional Analysis**:
  - Security headers validation
  - CSS/JS coverage analysis
  - Carbon footprint estimation
  - Image format optimization analysis
- **Flexible Configuration**: JSON-based site configuration
- **Multiple Output Formats**: CSV and JSON reports

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install Chrome for Puppeteer:
```bash
npm run install-chrome
```

## Usage

1. **Configure your sites** by editing `sites-config.json`:
```json
{
  "sites": [
    {
      "name": "My Site",
      "type": "own",
      "urls": {
        "homepage": "https://example.com",
        "single": "https://example.com/blog/post",
        "archive": "https://example.com/blog"
      }
    },
    {
      "name": "Competitor Site",
      "type": "competitor",
      "urls": {
        "homepage": "https://competitor.com"
      }
    }
  ]
}
```

2. **Run the scanner** (recommended method with progress output):
```bash
node run-scanner.js
```

**Alternative methods:**
```bash
# Direct execution (may not show progress)
node index.js

# Using npm scripts
npm start
npm run dev
```

## Configuration

### Main Configuration (`src/config/index.js`)
Edit to modify:
- **runsPerUrl**: Number of test runs per URL (default: 3)
- **outputDir**: Where to save results (default: `./lighthouse-results`)
- **testBothDevices**: Test mobile and desktop (default: true)
- **includeSecurityHeaders**: Check security headers (default: true)
- **includeCarbonFootprint**: Calculate carbon footprint (default: true)

### Site Configuration (`sites-config.json`)
- **name**: Display name for the site
- **type**: "own" or "competitor" (affects reporting)
- **urls**: Object with page types and URLs to test
  - `homepage`: Main page URL
  - `single`: Single page/post URL (optional)
  - `archive`: Archive/listing page URL (optional)

### Lighthouse Configuration (`src/config/lighthouse-flags.js`)
- Device-specific settings (mobile/desktop)
- Throttling conditions
- Screen emulation settings
- Log verbosity levels

## Output

Results are saved to the `lighthouse-results/` directory:
- **`benchmark-YYYY-MM-DD.csv`** - Detailed CSV report with all metrics
- **`benchmark-YYYY-MM-DD.json`** - Raw JSON data for programmatic use

### CSV Report Columns
- Site information (name, type, URL)
- Performance scores (mobile/desktop)
- Core Web Vitals (LCP, CLS, TBT, FCP, TTI)
- Resource usage (total size, requests, JS/CSS/Image sizes)
- Coverage analysis (unused JS/CSS percentages)
- Issue counts by category
- Security headers score
- Carbon footprint data

### Console Output
When using `node run-scanner.js`, you'll see:
- Real-time progress updates
- Test completion status
- Error messages (if any)
- Final summary statistics

## Module Overview

### Config Module (`src/config/`)
- **index.js**: Main configuration settings
- **lighthouse-flags.js**: Device-specific Lighthouse configurations
- **sites-loader.js**: Loads and validates site configurations

### Utils Module (`src/utils/`)
- **security-headers.js**: Validates security headers
- **carbon-footprint.js**: Estimates carbon footprint
- **coverage-analysis.js**: Analyzes unused CSS/JS

### Lighthouse Module (`src/lighthouse/`)
- **runner.js**: Executes individual Lighthouse tests
- **result-processor.js**: Processes and averages results
- **tester.js**: Orchestrates multi-device testing

### Reporting Module (`src/reporting/`)
- **csv-generator.js**: Generates CSV reports
- **summary-generator.js**: Creates summary statistics

## Development

The modular structure makes it easy to:
- Add new analysis features in `src/utils/`
- Modify Lighthouse configurations in `src/config/lighthouse-flags.js`
- Extend reporting formats in `src/reporting/`
- Add new test types in `src/lighthouse/`

## Troubleshooting

### Console Output Not Showing
If `node index.js` runs silently without showing progress:
- Use `node run-scanner.js` instead for real-time output
- Check the `lighthouse-results/` directory for generated files
- The scanner may still be running in the background

### Coverage Analysis Errors
If you see "Navigating frame was detached" errors:
- This is handled gracefully and won't stop the scanner
- Coverage data may show zeros for affected sites
- All other metrics will still be collected

### Performance Issues
To speed up testing:
- Reduce `runsPerUrl` in `src/config/index.js` (default: 3)
- Set `testBothDevices: false` to test only mobile
- Reduce verbosity by setting `logLevel: 'error'` in lighthouse flags

## Dependencies

- **lighthouse**: Google's web performance auditing tool
- **chrome-launcher**: Launches Chrome for testing
- **puppeteer**: Browser automation for coverage analysis
- **axios**: HTTP client for security header checks
