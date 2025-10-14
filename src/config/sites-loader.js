const fs = require('fs').promises;

// Load sites configuration
async function loadSitesConfig() {
  try {
    const configFile = await fs.readFile('./sites-config.json', 'utf8');
    return JSON.parse(configFile);
  } catch (error) {
    console.error('Error loading sites-config.json. Creating template...');
    await createTemplateConfig();
    throw new Error('Please edit sites-config.json and run again');
  }
}

// Create template configuration file
async function createTemplateConfig() {
  const template = {
    sites: [
      {
        name: "My Site 1",
        type: "own",
        urls: {
          homepage: "https://example.com",
          single: "https://example.com/blog/post-title",
          archive: "https://example.com/blog"
        }
      },
      {
        name: "Competitor 1",
        type: "competitor",
        urls: {
          homepage: "https://competitor1.com",
          single: "https://competitor1.com/article",
          archive: "https://competitor1.com/articles"
        }
      }
    ]
  };
  
  await fs.writeFile('./sites-config.json', JSON.stringify(template, null, 2));
  console.log('Created sites-config.json template');
}

module.exports = {
  loadSitesConfig,
  createTemplateConfig
};
