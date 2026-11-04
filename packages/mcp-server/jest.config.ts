import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', { sourceMaps: 'inline' }],
  },
  moduleNameMapper: {
    '^e-invoice-api-mcp$': '<rootDir>/src/index.ts',
    '^e-invoice-api-mcp/(.*)$': '<rootDir>/src/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testPathIgnorePatterns: ['scripts'],

  // Coverage is opt-in (`yarn test:coverage`). The v8 provider matches the root package: sources are
  // transformed by @swc/jest, so v8 + swc source maps avoids a babel-plugin-istanbul instrumentation pass.
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'src/**/*.ts',
    // Type-only module: emits no JavaScript, but v8 would report every line as uncovered.
    '!src/code-tool-types.ts',
    // Runs inside a Deno subprocess spawned by code-tool.ts, never in the jest (Node) process,
    // so v8 cannot measure it here.
    '!src/code-tool-worker.ts',
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text-summary', 'lcov', 'json-summary'],
  // A ratchet, not an aspiration: set ~1-2 points below the measured numbers. Raise when coverage improves.
  coverageThreshold: {
    global: {
      // Measured: 76.68 / 50 / 65.85 / 76.68. The CLI/transport entry points (index.ts, http.ts,
      // stdio.ts) and the code tool's Deno execution path are not exercised by unit tests yet.
      statements: 75,
      branches: 48,
      functions: 64,
      lines: 75,
    },
  },
};

export default config;
