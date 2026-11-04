import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', { sourceMaps: 'inline' }],
  },
  moduleNameMapper: {
    '^e-invoice-api$': '<rootDir>/src/index.ts',
    '^e-invoice-api/(.*)$': '<rootDir>/src/$1',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/ecosystem-tests/',
    '<rootDir>/dist/',
    '<rootDir>/deno/',
    '<rootDir>/deno_tests/',
    '<rootDir>/packages/',
  ],
  testPathIgnorePatterns: ['scripts'],

  // Coverage is opt-in (`yarn test:coverage` / `./scripts/test --coverage`) so plain `yarn test` stays fast.
  // The v8 provider is used because sources are transformed by @swc/jest: v8 reads coverage from the
  // engine and maps it back through swc's source maps, so it needs no babel-plugin-istanbul (whose
  // `test-exclude` dependency is incompatible with the `minimatch` security resolution in package.json).
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'src/**/*.ts',
    // Type-only modules: they emit no JavaScript, but v8 would report every line as uncovered.
    '!src/internal/builtin-types.ts',
    '!src/internal/shim-types.ts',
    '!src/internal/types.ts',
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text-summary', 'lcov', 'json-summary'],
  // A ratchet, not an aspiration: set ~1-2 points below the measured numbers. Raise when coverage improves.
  coverageThreshold: {
    global: {
      // Measured: 96.37 / 85.17 / 66.09 / 96.37. Functions is low because the generated resource
      // methods are only exercised by the Prism-backed tests in tests/api-resources, which are skipped.
      statements: 95,
      branches: 83,
      functions: 64,
      lines: 95,
    },
  },
};

export default config;
