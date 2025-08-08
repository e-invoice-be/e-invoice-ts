# Changelog

## 1.7.1 (2025-08-08)

Full Changelog: [v1.7.0...v1.7.1](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.7.0...v1.7.1)

### Features

* **api:** api update ([aeb06d9](https://github.com/e-invoice-be/e-invoice-ts/commit/aeb06d99f43d6b48092675da7a0450f4ed6e0d49))
* **mcp:** add unix socket option for remote MCP ([c626d02](https://github.com/e-invoice-be/e-invoice-ts/commit/c626d02b76d2dfcdb6b02466450e984e4c42a0aa))


### Chores

* **internal:** move publish config ([7d68587](https://github.com/e-invoice-be/e-invoice-ts/commit/7d685873aa9cb9e16658397d111ce48a1d8e733f))
* **mcp:** refactor streamable http transport ([994996d](https://github.com/e-invoice-be/e-invoice-ts/commit/994996d8a02ca829cfe8c31ce1bd0df57089b258))

## 1.7.0 (2025-08-06)

Full Changelog: [v1.6.5...v1.7.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.6.5...v1.7.0)

### Features

* **mcp:** add logging when environment variable is set ([e7efcd7](https://github.com/e-invoice-be/e-invoice-ts/commit/e7efcd77f386564d3f89d1baf42fda0a509f0114))
* **mcp:** remote server with passthru auth ([49a4494](https://github.com/e-invoice-be/e-invoice-ts/commit/49a4494906b526aad6c0d2ce2c5903b9657ee26d))


### Bug Fixes

* **mcp:** fix bug in header handling ([f0c5486](https://github.com/e-invoice-be/e-invoice-ts/commit/f0c548683643ccaa092c2ff480126724a17d9be5))

## 1.6.5 (2025-08-01)

Full Changelog: [v1.6.4...v1.6.5](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.6.4...v1.6.5)

### Bug Fixes

* **mcp:** avoid sending `jq_filter` to base API ([af0471f](https://github.com/e-invoice-be/e-invoice-ts/commit/af0471fc59405d7864693206fba9ece3c4a86e3f))

## 1.6.4 (2025-08-01)

Full Changelog: [v1.6.3...v1.6.4](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.6.3...v1.6.4)

### Bug Fixes

* **mcp:** fix tool description of jq_filter ([fdc6c78](https://github.com/e-invoice-be/e-invoice-ts/commit/fdc6c787a8da241f873f70285c8acae17f2dbc71))


### Chores

* **internal:** codegen related update ([ea0555c](https://github.com/e-invoice-be/e-invoice-ts/commit/ea0555c37bad374b628430df6ef1e1072af0aa90))
* **internal:** remove redundant imports config ([7b32652](https://github.com/e-invoice-be/e-invoice-ts/commit/7b32652dd08077303d03276bc4ff5029d0326074))
* **internal:** version bump ([382bc96](https://github.com/e-invoice-be/e-invoice-ts/commit/382bc96f8ad42a17bd67b1948cd0955e02464c78))

## 1.6.3 (2025-07-18)

Full Changelog: [v1.6.2...v1.6.3](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.6.2...v1.6.3)

### Chores

* **internal:** codegen related update ([2be914a](https://github.com/e-invoice-be/e-invoice-ts/commit/2be914abede38a932951c0fbf37ebd21c3684681))
* **internal:** version bump ([66eadca](https://github.com/e-invoice-be/e-invoice-ts/commit/66eadca460b0d185fbb48f1285ad2ce2a9f16662))

## 1.6.2 (2025-07-18)

Full Changelog: [v1.6.1...v1.6.2](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.6.1...v1.6.2)

### Bug Fixes

* **mcp:** include required section for top-level properties and support naming transformations ([281dd54](https://github.com/e-invoice-be/e-invoice-ts/commit/281dd541e9051c23b102525f51349a1b88ef7671))


### Chores

* **internal:** version bump ([8c2b667](https://github.com/e-invoice-be/e-invoice-ts/commit/8c2b6679495ee040a577ab0fbfa830efa96788b0))
* **mcp:** formatting ([f95ba72](https://github.com/e-invoice-be/e-invoice-ts/commit/f95ba72d7b9539a3e6419907fb9ceb40d6d14ed3))
* **mcp:** rework imports in tools ([2638a44](https://github.com/e-invoice-be/e-invoice-ts/commit/2638a44f5e576c9c27582ac736b680a8d9256fd5))
* **ts:** reorder package.json imports ([245035e](https://github.com/e-invoice-be/e-invoice-ts/commit/245035e0604d5e4a902ca62a5bd7769926b1ef0d))

## 1.6.1 (2025-07-16)

Full Changelog: [v1.6.0...v1.6.1](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.6.0...v1.6.1)

### Bug Fixes

* **mcp:** support jq filtering on cloudflare workers ([9578df9](https://github.com/e-invoice-be/e-invoice-ts/commit/9578df9a8b679e22006637d60de5b651bf544a93))


### Chores

* **internal:** version bump ([84f71ce](https://github.com/e-invoice-be/e-invoice-ts/commit/84f71ce3de8321b9d4dcc6516e8701df52d822db))

## 1.6.0 (2025-07-14)

Full Changelog: [v1.5.1...v1.6.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.5.1...v1.6.0)

### Features

* **api:** manual updates ([3a14e91](https://github.com/e-invoice-be/e-invoice-ts/commit/3a14e91d7d3bf948929ef713f3829698e4c2b32b))


### Chores

* **internal:** version bump ([4c3020f](https://github.com/e-invoice-be/e-invoice-ts/commit/4c3020fbf937c0cf36bab278470b58b8897fcfda))

## 1.5.1 (2025-07-11)

Full Changelog: [v1.5.0...v1.5.1](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.5.0...v1.5.1)

### Chores

* **internal:** codegen related update ([d60a40a](https://github.com/e-invoice-be/e-invoice-ts/commit/d60a40af3808620d35dc7aba3f23ce9bba6f2481))

## 1.5.0 (2025-07-11)

Full Changelog: [v1.4.4...v1.5.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.4.4...v1.5.0)

### Features

* **mcp:** support filtering tool results by a jq expression ([6c9d40f](https://github.com/e-invoice-be/e-invoice-ts/commit/6c9d40f0deebebc2913c2c0237637ea44717b890))


### Bug Fixes

* **mcp:** relax input type for asTextContextResult ([534ccba](https://github.com/e-invoice-be/e-invoice-ts/commit/534ccba10752d2aa1ec6f990dfc3f72ba2826706))


### Chores

* make some internal functions async ([ef09128](https://github.com/e-invoice-be/e-invoice-ts/commit/ef0912825537bfee2295a355be9405ca7a381d6c))

## 1.4.4 (2025-07-03)

Full Changelog: [v1.4.3...v1.4.4](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.4.3...v1.4.4)

### Chores

* add docs to RequestOptions type ([27e016e](https://github.com/e-invoice-be/e-invoice-ts/commit/27e016ee96ef42a784962b0c9d4a031a5160819e))
* **client:** improve path param validation ([a73df9b](https://github.com/e-invoice-be/e-invoice-ts/commit/a73df9b0a5409212e9018f6af46667ce611b397f))

## 1.4.3 (2025-06-30)

Full Changelog: [v1.4.2...v1.4.3](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.4.2...v1.4.3)

### Chores

* **ci:** only run for pushes and fork pull requests ([effb1d9](https://github.com/e-invoice-be/e-invoice-ts/commit/effb1d9a5c56b3996b1e11c0940a5f9e4e824901))

## 1.4.2 (2025-06-27)

Full Changelog: [v1.4.1...v1.4.2](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.4.1...v1.4.2)

### Bug Fixes

* **ci:** release-doctor — report correct token name ([5d82c2b](https://github.com/e-invoice-be/e-invoice-ts/commit/5d82c2b09bb7356c019ef923a29d8b9d655fdd89))
* **client:** get fetchOptions type more reliably ([9d28c7d](https://github.com/e-invoice-be/e-invoice-ts/commit/9d28c7d25ea3e9cd4ef8b89a13b56b681f388d48))

## 1.4.1 (2025-06-24)

Full Changelog: [v1.4.0...v1.4.1](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.4.0...v1.4.1)

### Refactors

* **types:** replace Record with mapped types ([ff6196a](https://github.com/e-invoice-be/e-invoice-ts/commit/ff6196a7d87b1841fb9a701fbe55abcb09043462))

## 1.4.0 (2025-06-23)

Full Changelog: [v1.3.3...v1.4.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.3.3...v1.4.0)

### Features

* **api:** api update ([53d70e8](https://github.com/e-invoice-be/e-invoice-ts/commit/53d70e84f04f3b1daca3f2784180d4a57baee073))

## 1.3.3 (2025-06-21)

Full Changelog: [v1.3.2...v1.3.3](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.3.2...v1.3.3)

### Bug Fixes

* **client:** explicitly copy fetch in withOptions ([9dd8472](https://github.com/e-invoice-be/e-invoice-ts/commit/9dd8472d0200242310c4374ecff6c1a6e38eddd9))


### Chores

* **readme:** update badges ([027192f](https://github.com/e-invoice-be/e-invoice-ts/commit/027192f01e4688cdf789233e1a712c54da4fd96b))
* **readme:** use better example snippet for undocumented params ([0f4b526](https://github.com/e-invoice-be/e-invoice-ts/commit/0f4b5267bb94a5252eefc165243bcb63678c0ce1))

## 1.3.2 (2025-06-17)

Full Changelog: [v1.3.1...v1.3.2](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.3.1...v1.3.2)

### Bug Fixes

* Update package.json ([4bd67ab](https://github.com/e-invoice-be/e-invoice-ts/commit/4bd67ab3b881fdf4cd10eb05a8c5a01c232b590a))

## 1.3.1 (2025-06-17)

Full Changelog: [v1.3.0...v1.3.1](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.3.0...v1.3.1)

## 1.3.0 (2025-06-17)

Full Changelog: [v1.2.2...v1.3.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.2.2...v1.3.0)

### Features

* **client:** add support for endpoint-specific base URLs ([bf7e21e](https://github.com/e-invoice-be/e-invoice-ts/commit/bf7e21e5f51a6f0767c9dd3c88c302823855b4c1))


### Chores

* **ci:** enable for pull requests ([35d6c30](https://github.com/e-invoice-be/e-invoice-ts/commit/35d6c30a6fca18289199bec227a9dc10f3b8903d))
* **client:** refactor imports ([778320e](https://github.com/e-invoice-be/e-invoice-ts/commit/778320ec3f1aff188a5449935c6b86f067592ad7))

## 1.2.2 (2025-06-15)

Full Changelog: [v1.2.1...v1.2.2](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.2.1...v1.2.2)

### Bug Fixes

* extra keywords ([880f5dc](https://github.com/e-invoice-be/e-invoice-ts/commit/880f5dc750b20def2baa1e22899aa97f26fcf064))

## 1.2.1 (2025-06-15)

Full Changelog: [v1.2.0...v1.2.1](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.2.0...v1.2.1)

### Bug Fixes

* keywords ([101a80b](https://github.com/e-invoice-be/e-invoice-ts/commit/101a80bacdf0efb18570513ac98b6ece67ce308e))
* keywords ([ad7af2b](https://github.com/e-invoice-be/e-invoice-ts/commit/ad7af2bb714dbb66ab33731a2b66bd0b346742ca))

## 1.2.0 (2025-06-14)

Full Changelog: [v1.1.0...v1.2.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.1.0...v1.2.0)

### Features

* **api:** manual updates ([6db97ca](https://github.com/e-invoice-be/e-invoice-ts/commit/6db97cadc85d86eb3d7a78ae6d89ce91d565114d))
* **mcp:** set X-Stainless-MCP header ([d40a758](https://github.com/e-invoice-be/e-invoice-ts/commit/d40a7584b0eb95bbaed74e386c087d46bd5f3288))


### Bug Fixes

* publish script — handle NPM errors correctly ([a3ee32c](https://github.com/e-invoice-be/e-invoice-ts/commit/a3ee32c48249addf06b0cabef429e8197c75c3da))


### Chores

* **internal:** add pure annotations, make base APIResource abstract ([c35240e](https://github.com/e-invoice-be/e-invoice-ts/commit/c35240e122cd191d8bacf457286792c158cbb099))

## 1.1.0 (2025-06-12)

Full Changelog: [v1.0.1...v1.1.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.0.1...v1.1.0)

### Features

* **api:** manual updates ([7a8c5db](https://github.com/e-invoice-be/e-invoice-ts/commit/7a8c5dbc7181d13cb9b83c04e875ad5fa8ff6c0a))


### Documentation

* Update package.json ([ac14489](https://github.com/e-invoice-be/e-invoice-ts/commit/ac144899448ae0f873fdb4e827fd6eecf44311a3))

## 1.0.1 (2025-06-11)

Full Changelog: [v1.0.0...v1.0.1](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.0.0...v1.0.1)

### Chores

* **mcp:** provides high-level initMcpServer function and exports known clients ([3e4a2ce](https://github.com/e-invoice-be/e-invoice-ts/commit/3e4a2ce0e6999339e5d67843e52263a26abf3317))

## 1.0.0 (2025-06-10)

Full Changelog: [v0.1.0-alpha.3...v1.0.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v0.1.0-alpha.3...v1.0.0)

### Features

* **api:** api update ([227fd79](https://github.com/e-invoice-be/e-invoice-ts/commit/227fd79321bb4e594bfe6eadfc4b9f606cf7c820))
* **mcp:** implement support for binary responses ([078016f](https://github.com/e-invoice-be/e-invoice-ts/commit/078016ff361fe739aaaefcf1557dd48875ac8410))


### Chores

* adjust eslint.config.mjs ignore pattern ([83eb809](https://github.com/e-invoice-be/e-invoice-ts/commit/83eb809246b4eb2396f42812730d15f5e64c10c6))
* avoid type error in certain environments ([e67f1b8](https://github.com/e-invoice-be/e-invoice-ts/commit/e67f1b8d0a8f36be8886c1b6b79c6b43d1de9300))
* **docs:** use top-level-await in example snippets ([5935104](https://github.com/e-invoice-be/e-invoice-ts/commit/59351047c55f5885322af500e2beda165759710d))
* **internal:** fix readablestream types in node 20 ([9b9b860](https://github.com/e-invoice-be/e-invoice-ts/commit/9b9b86042006ca06685ab26913fc6c4c21179c4a))
* update SDK settings ([8e1463b](https://github.com/e-invoice-be/e-invoice-ts/commit/8e1463b2d6276493bb9b986789cdc4458337bca1))

## 0.1.0-alpha.3 (2025-05-31)

Full Changelog: [v0.1.0-alpha.2...v0.1.0-alpha.3](https://github.com/e-invoice-be/e-invoice-ts/compare/v0.1.0-alpha.2...v0.1.0-alpha.3)

### Chores

* **deps:** bump eslint-plugin-prettier ([49fe3d8](https://github.com/e-invoice-be/e-invoice-ts/commit/49fe3d83c627a84cc34539ee87dc4a7df5d11ee6))
* **internal:** update jest config ([b086cc7](https://github.com/e-invoice-be/e-invoice-ts/commit/b086cc7caa694010f9a1c9abbafda012bf11f522))


### Documentation

* **pagination:** improve naming ([e714129](https://github.com/e-invoice-be/e-invoice-ts/commit/e714129e44df6a74a6e3336712d6600d7e06765f))

## 0.1.0-alpha.2 (2025-05-30)

Full Changelog: [v0.1.0-alpha.1...v0.1.0-alpha.2](https://github.com/e-invoice-be/e-invoice-ts/compare/v0.1.0-alpha.1...v0.1.0-alpha.2)

### Features

* **api:** manual updates ([dfc48d1](https://github.com/e-invoice-be/e-invoice-ts/commit/dfc48d101dd1e4f7e7b8305fbf2d9f7b21d695f3))


### Chores

* sync repo ([0d3ecca](https://github.com/e-invoice-be/e-invoice-ts/commit/0d3ecca883531707a90600758c48abfc81427d0a))
* update SDK settings ([3023924](https://github.com/e-invoice-be/e-invoice-ts/commit/3023924159fe5b88f6417a32ce4bd2c6934864c1))

## 0.1.0-alpha.1 (2025-05-30)

Full Changelog: [v0.0.1-alpha.0...v0.1.0-alpha.1](https://github.com/e-invoice-be/e-invoice-api-sdk-ts/compare/v0.0.1-alpha.0...v0.1.0-alpha.1)

### Features

* **api:** api update ([525a3a4](https://github.com/e-invoice-be/e-invoice-api-sdk-ts/commit/525a3a45794f66867e1cdd7c807d6a07a21dfe2c))
* **api:** manual updates ([7c42a4f](https://github.com/e-invoice-be/e-invoice-api-sdk-ts/commit/7c42a4f5034d0dd108eed4ffaf4d001da8d4a543))
* **api:** manual updates ([e16ed7e](https://github.com/e-invoice-be/e-invoice-api-sdk-ts/commit/e16ed7e32f9ea6e775460e2b57fe067306fb74ab))
* **api:** update via SDK Studio ([0171ba7](https://github.com/e-invoice-be/e-invoice-api-sdk-ts/commit/0171ba71ce9b84e9f4f3f68d3c95c91b7d86d330))
* **api:** update via SDK Studio ([1fc953f](https://github.com/e-invoice-be/e-invoice-api-sdk-ts/commit/1fc953fc47b8c3b383b020f19aea9b3b16cf498d))
* **api:** update via SDK Studio ([647b7c5](https://github.com/e-invoice-be/e-invoice-api-sdk-ts/commit/647b7c599b8a8f69b07038a5f97d0b6ad7d3edf9))


### Chores

* configure new SDK language ([c6cc4c7](https://github.com/e-invoice-be/e-invoice-api-sdk-ts/commit/c6cc4c72b8176c92e98f192d8249341a8d448a07))
* update SDK settings ([ab860a9](https://github.com/e-invoice-be/e-invoice-api-sdk-ts/commit/ab860a91192be0f4468f088ba54837ca7476898a))
