// cypress.config.ts
import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:5173',
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        pageLoadTimeout: 120000,
        defaultCommandTimeout: 10000,
        retries: {
            runMode: 2,
            openMode: 0
        }
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false,
    screenshotOnRunFailure: true,
    projectId: 'react-burger',
})