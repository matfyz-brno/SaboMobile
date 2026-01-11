const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Base URL for the application under test
    baseUrl: "https://practice.expandtesting.com",

    // Patterns for test files
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",

    // Exclude files from watching
    excludeSpecPattern: ["**/__snapshots__/*", "**/__image_snapshots__/*"],

    // Support file
    supportFile: "cypress/support/e2e.js",

    // Screenshots and videos
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",

    // Video recording
    video: true,
    videoCompression: 32,

    // Screenshots
    screenshotOnRunFailure: true,

    // Viewport settings
    viewportWidth: 1280,
    viewportHeight: 720,

    // Timeouts
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 30000,

    // Test isolation
    testIsolation: true,

    // Experimental features
    experimentalStudio: true,
    experimentalWebKitSupport: true,

    setupNodeEvents(on, config) {
      // implement node event listeners here

      // Block ads and tracking scripts
      on("before:browser:launch", (browser = {}, launchOptions) => {
        // Add ad blocking arguments for Chrome/Chromium
        if (browser.family === "chromium" && browser.name !== "electron") {
          launchOptions.args.push("--disable-web-security");
          launchOptions.args.push("--disable-features=VizDisplayCompositor");
          launchOptions.args.push("--block-new-web-contents");
          launchOptions.args.push("--disable-popup-blocking");
        }

        // Add ad blocking arguments for Firefox
        if (browser.family === "firefox") {
          launchOptions.preferences["dom.popup_maximum"] = 0;
        }

        return launchOptions;
      });

      // Log console messages
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
  },

  // Component testing configuration (if needed)
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  // Environment variables
  env: {
    // Add any environment-specific variables here
    coverage: false,
    codeCoverage: {
      exclude: "cypress/**/*.*",
    },
  },

  // Retry configuration
  retries: {
    runMode: 2,
    openMode: 0,
  },

  // Browser configuration
  chromeWebSecurity: false,

  // File server options
  fixturesFolder: "cypress/fixtures",
});
