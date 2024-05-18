const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: `cypress/testReport`,
    overwrite: true
  },
  e2e: {
    // retries: 2,
    specPattern: 'src/tests/specs/cypress/launches.cy.js',
    supportFile: false,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    env: {
      USERNAME:'AnahitRP',
      PASSWORD:'rpPass2L'
    },
  },
});
