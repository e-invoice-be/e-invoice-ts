// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: [
      '**/dist/',
      '**/dist-deno/',
      '**/dist-bundle/',
      '**/node_modules/',
      'deno/',
      'ecosystem-tests/',
      'packages/mcp-server/manifest.json',
    ],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.mts', '**/*.cts'],
    extends: [tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: {
          // Root-level TS files that no tsconfig includes.
          allowDefaultProject: ['jest.config.ts', 'packages/mcp-server/jest.config.ts', 'scripts/*.ts'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.mts', '**/*.cts', '**/*.js', '**/*.mjs', '**/*.cjs'],
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      // --- Opinionated additions on top of the recommended presets ---
      eqeqeq: ['error', 'smart'],
      // A promise returned from inside try/catch/finally without `await` escapes the handler
      // (e.g. timeout cleanup would run before the request settles).
      '@typescript-eslint/return-await': ['error', 'error-handling-correctness-only'],
      // Swallowing an error in a best-effort fallback (`catch {}`) is a deliberate pattern here.
      'no-empty': ['error', { allowEmptyCatch: true }],
      // `@ts-ignore` is needed for types that only resolve in some environments (Node/Deno/Bun/undici),
      // where `@ts-expect-error` would fail in the others. Require a reason.
      '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],

      // --- Recommended rules that are noise for this SDK ---
      // `any` is used deliberately at the edges (untyped JSON responses, fetch/stream shims, generic
      // request plumbing). The `no-unsafe-*` family flags every downstream use of those values.
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      // `export declare namespace Foo { export { type Bar } }` is the resource type re-export pattern.
      '@typescript-eslint/no-namespace': 'off',
      // Overridable hooks (e.g. `authHeaders`, `shouldRetry`) are async for subclass compatibility even
      // when the default implementation doesn't await; dropping `async` would change throw semantics.
      '@typescript-eslint/require-await': 'off',

      // Unused locals/parameters are reported by tsc (noUnusedLocals / noUnusedParameters);
      // this rule only removes unused imports, which it can autofix.
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '^e-invoice-api(/.*)?',
              message: 'Use a relative import, not a package import.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['tests/**', 'examples/**', 'packages/**'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
  {
    // Tests use `jest.resetModules()` + `require()` to re-evaluate modules with patched globals.
    files: ['**/tests/**'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    // Environment-dependent shim types: each union member resolves to `never`/`any` or a duplicate
    // depending on which fetch/stream typings the consumer has installed. That is the point.
    files: ['src/internal/types.ts', 'src/internal/shim-types.ts'],
    rules: {
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/no-duplicate-type-constituents': 'off',
    },
  },
  {
    // Public error types use `Object` (any non-nullish value, primitives included) for the error body;
    // narrowing to `object` would be a breaking change to `APIError`'s generic constraint.
    files: ['src/core/error.ts', 'src/client.ts', 'src/internal/utils/values.ts'],
    rules: {
      '@typescript-eslint/no-wrapper-object-types': 'off',
    },
  },
  {
    // Plain JS files have no type information.
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    // Build/release scripts and config files run directly under Node.
    files: ['**/*.cjs', '**/*.mjs', '**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: { sourceType: 'commonjs' },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  // Must come last: turns off any rule that would conflict with Prettier formatting.
  prettierConfig,
);
