const { defineConfig } = require('cypress')
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Load environment variables
      config.env = {
        ...config.env,
        BASE_URL: process.env.BASE_URL,
        VALID_USERNAME: process.env.VALID_USERNAME,
        VALID_PASSWORD: process.env.VALID_PASSWORD,
        ADMIN_USERNAME: process.env.ADMIN_USERNAME,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
        API_BASE_URL: process.env.API_BASE_URL
      }
      return config
    },
    baseUrl: process.env.BASE_URL || 'https://transax.example.com',
    viewportWidth: parseInt(process.env.VIEWPORT_WIDTH) || 1280,
    viewportHeight: parseInt(process.env.VIEWPORT_HEIGHT) || 720,
    defaultCommandTimeout: parseInt(process.env.DEFAULT_TIMEOUT) || 10000,
    requestTimeout: parseInt(process.env.DEFAULT_TIMEOUT) || 10000,
    responseTimeout: parseInt(process.env.DEFAULT_TIMEOUT) || 10000,
    video: true,
    screenshotOnRunFailure: true,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    downloadsFolder: 'cypress/downloads'
  },
})
