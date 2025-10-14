# Contributing to Lighthouse Benchmark Scanner

Thank you for your interest in contributing to the Lighthouse Benchmark Scanner! This document provides guidelines for contributing to this project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/lighthouse-benchmark-scanner.git`
3. Install dependencies: `npm install`
4. Create a new branch: `git checkout -b feature/your-feature-name`

## Development Setup

1. Install Chrome for Puppeteer: `npm run install-chrome`
2. Create a `sites-config.json` file for testing (see README.md)
3. Run the scanner: `npm start`

## Code Style

- Use consistent indentation (2 spaces)
- Follow existing code patterns
- Add comments for complex logic
- Keep functions focused and modular

## Project Structure

```
src/
├── config/          # Configuration management
├── utils/           # Utility functions
├── lighthouse/      # Lighthouse testing logic
├── reporting/       # Report generation
└── index.js         # Main application
```

## Adding New Features

### New Analysis Features
Add new analysis functions to `src/utils/`:
1. Create a new file (e.g., `new-analysis.js`)
2. Export your function
3. Add it to `src/utils/index.js`
4. Update the main tester in `src/lighthouse/tester.js`

### New Report Formats
Add new report generators to `src/reporting/`:
1. Create a new file (e.g., `html-generator.js`)
2. Export your function
3. Add it to `src/reporting/index.js`
4. Update the main application in `src/index.js`

### New Lighthouse Configurations
Modify `src/config/lighthouse-flags.js` to add new device configurations or test settings.

## Testing

Before submitting a pull request:
1. Test your changes with different site configurations
2. Ensure all modules still import correctly
3. Verify output formats work as expected
4. Test with both mobile and desktop configurations

## Submitting Changes

1. Ensure your code follows the project's style guidelines
2. Test your changes thoroughly
3. Update documentation if needed
4. Submit a pull request with a clear description of your changes

## Reporting Issues

When reporting issues, please include:
- Node.js version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Any error messages

## Questions?

Feel free to open an issue for questions or discussions about the project.
