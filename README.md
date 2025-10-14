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

1. Create a `sites-config.json` file (template will be created automatically on first run):
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
    }
  ]
}
```

2. Run the scanner:
```bash
npm start
# or
npm run dev
```

## Configuration

Edit `src/config/index.js` to modify:
- Number of runs per URL
- Output directory
- Device testing (mobile/desktop)
- Additional analysis features

## Output

Results are saved to the `lighthouse-results/` directory:
- `benchmark-YYYY-MM-DD.csv` - Detailed CSV report
- `benchmark-YYYY-MM-DD.json` - Raw JSON data

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

## Dependencies

- **lighthouse**: Google's web performance auditing tool
- **chrome-launcher**: Launches Chrome for testing
- **puppeteer**: Browser automation for coverage analysis
- **axios**: HTTP client for security header checks
