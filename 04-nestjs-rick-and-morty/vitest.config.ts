// tells TypeScript to include types from the vitest
/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'
import path from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  //default configuration object for vitest. Inside the defineConfig function, you define various settings for your tests.
  plugins: [react()], // for testing React components.
  test: {
    //object that contains settings related to the testing environment.
    globals: true,
    setupFiles: 'src/helpers/setupTests.ts',
    environment: 'jsdom',
    coverage: {
      // files to include in metrics for coverage
      // add your folders, adjust based on yor structure
      // REVISAR INCLUDE
      include: [
        'src/components/**/*.{ts,tsx}',
        'src/helpers/**/*.{ts,tsx},',
        'src/__tests__/utils/**/*.{ts,tsx}',
        'src/app/utils/**/*.{ts,tsx}',
      ],
      // if you want to exclude some files
      exclude: [],
      reporter: ['html', 'text-summary'],
      thresholds: {
        functions: 50,
        lines: 50,
        branches: 50,
        statements: 50,
      },
    },
  },
  resolve: {
    // object allows you to define alias mappings for resolving module imports.
    alias: {
      // add this section if you are using an alias
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
