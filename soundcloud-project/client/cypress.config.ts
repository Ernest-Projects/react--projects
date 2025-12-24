import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    viewportWidth: 1366,
    viewportHeight: 800,
    devServer: {
      framework: "react",
      bundler: "vite",
    },

    supportFile: "cypress/support/component.tsx",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1366,
    viewportHeight: 800,
    baseUrl: "http://localhost:5173",
  },
});
