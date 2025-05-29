import { config } from '@vue/test-utils'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { cleanup } from '@testing-library/vue'

// Global setup for Vue Test Utils
config.global.stubs = {}

// Clean up after each test
afterEach(() => {
  cleanup()
})

// Add any global setup/teardown hooks here
beforeAll(() => {
  // Setup code that runs before all tests
})

afterAll(() => {
  // Cleanup code that runs after all tests
})

// You can add custom matchers here if needed
