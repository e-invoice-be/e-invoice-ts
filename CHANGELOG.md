# Changelog

## 2.0.0 (2026-09-01)

Full Changelog: [v1.25.0...v2.0.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.25.0...v2.0.0)

### ⚠ BREAKING CHANGES

* **mcp:** remove deprecated tool schemes
* **mcp:** **Migration:** To migrate, simply modify the command used to invoke the MCP server. Currently, the only supported tool scheme is code mode. Now, starting the server with just `node /path/to/mcp/server` or `npx package-name` will invoke code tools: changing your command to one of these is likely all you will need to do.

### Features

* **api:** api update ([2465f86](https://github.com/e-invoice-be/e-invoice-ts/commit/2465f8634bf2fc5f9292de7c438a2d09542f4984))
* **api:** api update ([088e691](https://github.com/e-invoice-be/e-invoice-ts/commit/088e6916dd626538fb11347a332839ddf7d38d95))
* **api:** api update ([0ccb863](https://github.com/e-invoice-be/e-invoice-ts/commit/0ccb8639b343361a6196ddf446a2f06ecf0128c0))
* **api:** api update ([e417633](https://github.com/e-invoice-be/e-invoice-ts/commit/e417633095567538cd06fc7646903f7026000aaf))
* **api:** api update ([8885bac](https://github.com/e-invoice-be/e-invoice-ts/commit/8885bac59d9fb696cb883c157aec80dae826df5a))
* **api:** api update ([24d52e1](https://github.com/e-invoice-be/e-invoice-ts/commit/24d52e1633a8c156c0b42ee6c6e46275e638d261))
* **api:** api update ([ae896ec](https://github.com/e-invoice-be/e-invoice-ts/commit/ae896ec3dc80e16c8cb72fb5e4e7a4a49e369f10))
* **api:** api update ([4c91ace](https://github.com/e-invoice-be/e-invoice-ts/commit/4c91ace5048bf49e0ffef264f465ded183f72e3d))
* **api:** api update ([c3b4519](https://github.com/e-invoice-be/e-invoice-ts/commit/c3b45196767ef22b035245b2c4960efa40eda78b))
* **api:** api update ([07aea3d](https://github.com/e-invoice-be/e-invoice-ts/commit/07aea3d3914ac1e1f33ad84cb690d0c5be7e38dd))
* **api:** api update ([cedc3ce](https://github.com/e-invoice-be/e-invoice-ts/commit/cedc3cead8b88959fa7aa9d2fe3dda4fccd46050))
* **api:** api update ([976c5ab](https://github.com/e-invoice-be/e-invoice-ts/commit/976c5ab853437b5b0e96d3649e71d0890fc940ce))
* **api:** api update ([8d351d8](https://github.com/e-invoice-be/e-invoice-ts/commit/8d351d8e2e4942ff10381dfb9e125d21ee8b77da))
* **api:** api update ([bc3e128](https://github.com/e-invoice-be/e-invoice-ts/commit/bc3e128441adedf7a9ab84eda22d1dd403cd7c29))
* **api:** api update ([ddfbdfe](https://github.com/e-invoice-be/e-invoice-ts/commit/ddfbdfee7fbc771e99759f56ddfbd97b2b09b2f6))
* **api:** api update ([e3b821f](https://github.com/e-invoice-be/e-invoice-ts/commit/e3b821fe0d0077e3f718e4e5fe56c7a6cb039bf5))
* **api:** api update ([8ce799d](https://github.com/e-invoice-be/e-invoice-ts/commit/8ce799d1ec9890de9ac6dc989f486a43123a4445))
* **api:** api update ([7c10d33](https://github.com/e-invoice-be/e-invoice-ts/commit/7c10d33b664914ea1899e0aaefc79d37a9cab469))
* **mcp:** add initial server instructions ([17fdc82](https://github.com/e-invoice-be/e-invoice-ts/commit/17fdc8254bb80e9e6eae123a489def1f9549c495))
* **stlc:** configurable CI runner and private-production-repo support in workflow templates ([c7db350](https://github.com/e-invoice-be/e-invoice-ts/commit/c7db350d0185912290bea29b3c0e92a9a3644927))


### Bug Fixes

* **client:** avoid memory leak with abort signals ([fff7027](https://github.com/e-invoice-be/e-invoice-ts/commit/fff70271f607748b1fe7612f616b288ed54a4836))
* **client:** avoid removing abort listener too early ([03b1030](https://github.com/e-invoice-be/e-invoice-ts/commit/03b1030a893e1a32fae08dca6a35f699cb658583))
* **client:** send content-type header for requests with an omitted optional body ([931ce61](https://github.com/e-invoice-be/e-invoice-ts/commit/931ce61f1f5e2983c53a5a2a085a9376fef1d04e))
* **docs:** fix mcp installation instructions for remote servers ([db94c0c](https://github.com/e-invoice-be/e-invoice-ts/commit/db94c0c5dabcd3ca8fdf1d24f83da79568dde0e7))
* **mcp:** allow falling back for required env variables ([d8e73f1](https://github.com/e-invoice-be/e-invoice-ts/commit/d8e73f110d71f4dd5685c2b01a150e7a98309ef0))
* **mcp:** correct code tool api output types ([a2f05dd](https://github.com/e-invoice-be/e-invoice-ts/commit/a2f05dd62bf6bdea064e2bf3704a94c63ea0f2de))
* **mcp:** fix env parsing ([3a8807b](https://github.com/e-invoice-be/e-invoice-ts/commit/3a8807bee9de8c3fe840ec1948644f22959baa43))
* **mcp:** fix options parsing ([631fcf7](https://github.com/e-invoice-be/e-invoice-ts/commit/631fcf70c1e71eca8ecae648b958e2573ea97040))
* **mcp:** initialize SDK lazily to avoid failing the connection on init errors ([3f05ef3](https://github.com/e-invoice-be/e-invoice-ts/commit/3f05ef3ddf86f3189cb068915a925a366395b5ea))
* **mcp:** update code tool prompt ([3910b5b](https://github.com/e-invoice-be/e-invoice-ts/commit/3910b5bb443e7156c380cbf4f2e1beb12449229e))
* **stlc:** stop hand-edited CI workflows from blocking seals and builds ([e3a5cd3](https://github.com/e-invoice-be/e-invoice-ts/commit/e3a5cd33ab93e85d462550b342b0920c90c6c2ed))
* treat text/plan with format: binary as raw upload ([b54ee82](https://github.com/e-invoice-be/e-invoice-ts/commit/b54ee82fbd8fcf17913ee106d08a31a1ae147e60))


### Chores

* break long lines in snippets into multiline ([259c00e](https://github.com/e-invoice-be/e-invoice-ts/commit/259c00e7c9e38e6611706857c9dd47a65a9a75ba))
* **ci:** upgrade `actions/github-script` ([858a3cd](https://github.com/e-invoice-be/e-invoice-ts/commit/858a3cdada02e96e71c69ae6f2499f939dad9f6d))
* **client:** do not parse responses with empty content-length ([cb4d109](https://github.com/e-invoice-be/e-invoice-ts/commit/cb4d10940630c2d313bdc6eb96ba564a8b4e7e6b))
* **client:** restructure abort controller binding ([d5c14b4](https://github.com/e-invoice-be/e-invoice-ts/commit/d5c14b48bec22243097de619da1f6eb81fbab520))
* fix typo in descriptions ([a7a8f67](https://github.com/e-invoice-be/e-invoice-ts/commit/a7a8f67a93c0a89b75d3f5547bb200136143cfbe))
* **internal:** add health check to MCP server when running in HTTP mode ([7c50a2d](https://github.com/e-invoice-be/e-invoice-ts/commit/7c50a2d486f8d3dd727516e4b027749c560f4fbb))
* **internal:** allow basic filtering of methods allowed for MCP code mode ([f5682f7](https://github.com/e-invoice-be/e-invoice-ts/commit/f5682f783886f07628fe01d3b491d83fcf13d996))
* **internal:** always generate MCP server dockerfiles and upgrade associated dependencies ([a570e7a](https://github.com/e-invoice-be/e-invoice-ts/commit/a570e7a3773966f7b2d4ebb831ac3e9926cda984))
* **internal:** avoid type checking errors with ts-reset ([913dac1](https://github.com/e-invoice-be/e-invoice-ts/commit/913dac13adafd690c3adf0db362422d49c33c0e2))
* **internal:** codegen related update ([6e75083](https://github.com/e-invoice-be/e-invoice-ts/commit/6e750838cde83e1b9f623a83a40cbc336836a795))
* **internal:** codegen related update ([33f32ee](https://github.com/e-invoice-be/e-invoice-ts/commit/33f32eefc4ae96929fb4820f8580dc5b4317dfd6))
* **internal:** codegen related update ([35e5e9b](https://github.com/e-invoice-be/e-invoice-ts/commit/35e5e9bbbc077c47c91d74901881a0c5249858f8))
* **internal:** codegen related update ([cb28669](https://github.com/e-invoice-be/e-invoice-ts/commit/cb28669360f6e2cab7c7725874c9944a89664dae))
* **internal:** codegen related update ([e858542](https://github.com/e-invoice-be/e-invoice-ts/commit/e858542541c565e3c6614a6e9f3b36b311cbed2f))
* **internal:** codegen related update ([2e91513](https://github.com/e-invoice-be/e-invoice-ts/commit/2e91513100f017ed0bf172f2e74ede4e8912ceb0))
* **internal:** codegen related update ([f6a1369](https://github.com/e-invoice-be/e-invoice-ts/commit/f6a1369b4911099117b7784b32fe6f3df1f48c23))
* **internal:** codegen related update ([76dadf4](https://github.com/e-invoice-be/e-invoice-ts/commit/76dadf4b2eb35d600df52e9cfccee0bcde21d309))
* **internal:** codegen related update ([62c69aa](https://github.com/e-invoice-be/e-invoice-ts/commit/62c69aa3e53d551b1f62806f33fd58822fab7043))
* **internal:** codegen related update ([b0cf965](https://github.com/e-invoice-be/e-invoice-ts/commit/b0cf9656b3d69f376f0a8d5500dfd54b6b659a3e))
* **internal:** codegen related update ([f10906b](https://github.com/e-invoice-be/e-invoice-ts/commit/f10906b09dfd3945deab829547deb593245f56de))
* **internal:** codegen related update ([8e677c1](https://github.com/e-invoice-be/e-invoice-ts/commit/8e677c1d86bf78ef7ab6492708fe8b2cb11a3b06))
* **internal:** codegen related update ([2a69e28](https://github.com/e-invoice-be/e-invoice-ts/commit/2a69e28c95de783252832550b4d2d99e800002b2))
* **internal:** codegen related update ([1c64a52](https://github.com/e-invoice-be/e-invoice-ts/commit/1c64a52b5d2fa0ce47e92f2ba562bc1dfb4b29e1))
* **internal:** codegen related update ([f790229](https://github.com/e-invoice-be/e-invoice-ts/commit/f790229ce303e4a2e1d7cbbb3014153054ffd22b))
* **internal:** codegen related update ([8ca3018](https://github.com/e-invoice-be/e-invoice-ts/commit/8ca3018a257adfc0c280f5787b4ca4248b0cd8d5))
* **internal:** codegen related update ([921dd47](https://github.com/e-invoice-be/e-invoice-ts/commit/921dd47f05d98e8c4a639ed85855d0fc62485cd5))
* **internal:** codegen related update ([f7782b4](https://github.com/e-invoice-be/e-invoice-ts/commit/f7782b46c9565e5b32db4035ea66d93c2c934819))
* **internal:** codegen related update ([1f2dd31](https://github.com/e-invoice-be/e-invoice-ts/commit/1f2dd313da4138cb5b5d1a53f497fa168707cd49))
* **internal:** codegen related update ([2b31ae9](https://github.com/e-invoice-be/e-invoice-ts/commit/2b31ae938156bd1d2b76ef908e0b2c9603de9281))
* **internal:** codegen related update ([fa341eb](https://github.com/e-invoice-be/e-invoice-ts/commit/fa341eb6a6cd9700977770e5216686d407fcc30f))
* **internal:** codegen related update ([d4ebde3](https://github.com/e-invoice-be/e-invoice-ts/commit/d4ebde3151dd133b494c318a3bad9fd7306a9188))
* **internal:** codegen related update ([9a3d4af](https://github.com/e-invoice-be/e-invoice-ts/commit/9a3d4afb1c31ae3672c6847cb58208d1a0031cfa))
* **internal:** codegen related update ([e9336bc](https://github.com/e-invoice-be/e-invoice-ts/commit/e9336bcc07a7ee9eb0412d51ceaf05ceedc771de))
* **internal:** codegen related update ([2176f31](https://github.com/e-invoice-be/e-invoice-ts/commit/2176f31484d5b2001f035bdc74dd56b257af6c4f))
* **internal:** codegen related update ([4d794e8](https://github.com/e-invoice-be/e-invoice-ts/commit/4d794e8250714b7e3f770864393494c94a024322))
* **internal:** codegen related update ([c1e01a1](https://github.com/e-invoice-be/e-invoice-ts/commit/c1e01a1558016965b52c6cb27fa56ca5059d130b))
* **internal:** codegen related update ([e6db983](https://github.com/e-invoice-be/e-invoice-ts/commit/e6db983ce471f7d7215a2e98bc5e8f9c275bd452))
* **internal:** codegen related update ([ddfe7d9](https://github.com/e-invoice-be/e-invoice-ts/commit/ddfe7d95af7ea762bb19b47c4b4f645cae0a1c25))
* **internal:** codegen related update ([f202e0a](https://github.com/e-invoice-be/e-invoice-ts/commit/f202e0a6ea84efad8b2864ceff2f8c12c1a5f01a))
* **internal:** codegen related update ([ba5ae82](https://github.com/e-invoice-be/e-invoice-ts/commit/ba5ae82507032ac1a3967dd3099d3f7e835e4d77))
* **internal:** codegen related update ([dce05ec](https://github.com/e-invoice-be/e-invoice-ts/commit/dce05ec2cebf29995b05583025a0fc5b1fa51d97))
* **internal:** codegen related update ([f2bf31d](https://github.com/e-invoice-be/e-invoice-ts/commit/f2bf31d9fbcbf74ae1e74346e0654005a1d1fd85))
* **internal:** codegen related update ([4f36850](https://github.com/e-invoice-be/e-invoice-ts/commit/4f368502e24dc19faaa06c657bf781c936e1efbc))
* **internal:** codegen related update ([9d574c7](https://github.com/e-invoice-be/e-invoice-ts/commit/9d574c7ad7973652f3556ee9512da5e944da8eee))
* **internal:** codegen related update ([3bd626f](https://github.com/e-invoice-be/e-invoice-ts/commit/3bd626f23f6cce6e71feed0406416b397ab84f1f))
* **internal:** codegen related update ([a9b2f4f](https://github.com/e-invoice-be/e-invoice-ts/commit/a9b2f4f831195970ee5db12d094c97148a0c6233))
* **internal:** codegen related update ([72bbd31](https://github.com/e-invoice-be/e-invoice-ts/commit/72bbd31a0308c56c79e688218faf1ce59cab182b))
* **internal:** codegen related update ([7d4ea61](https://github.com/e-invoice-be/e-invoice-ts/commit/7d4ea61493602215bcc8d5204a330f63ab433314))
* **internal:** codegen related update ([a8e8fd8](https://github.com/e-invoice-be/e-invoice-ts/commit/a8e8fd803a3f07296758b6702fd1f3ca31db8bbc))
* **internal:** codegen related update ([22b249d](https://github.com/e-invoice-be/e-invoice-ts/commit/22b249d7fb7faad50bf6f5b88155c693c8c05d53))
* **internal:** codegen related update ([591f4b1](https://github.com/e-invoice-be/e-invoice-ts/commit/591f4b14bc8c3848af75d0a24505bae9af206584))
* **internal:** codegen related update ([0f55444](https://github.com/e-invoice-be/e-invoice-ts/commit/0f55444056f76cdf6652dbbab61148d1b78dc5ef))
* **internal:** codegen related update ([eed23b6](https://github.com/e-invoice-be/e-invoice-ts/commit/eed23b608fbacc715e6acb5b081e0aa661ca2555))
* **internal:** fix MCP Dockerfiles so they can be built without buildkit ([4150c2f](https://github.com/e-invoice-be/e-invoice-ts/commit/4150c2fd549e2191cfade17067716925edad6650))
* **internal:** fix MCP Dockerfiles so they can be built without buildkit ([09af5bd](https://github.com/e-invoice-be/e-invoice-ts/commit/09af5bdbee91d4767c624cbd7301cbb79f9df131))
* **internal:** fix pagination internals not accepting option promises ([cd15a90](https://github.com/e-invoice-be/e-invoice-ts/commit/cd15a90dd87cb9a6a78c0dbdd16ddba8d5a7bbc4))
* **internal:** improve layout of generated MCP server files ([ce42441](https://github.com/e-invoice-be/e-invoice-ts/commit/ce424418d422aa217b8cfd370450b4ed365a9b73))
* **internal:** refactor flag parsing for MCP servers and add debug flag ([771ea33](https://github.com/e-invoice-be/e-invoice-ts/commit/771ea332c7cfe721a492a3975ec1483ebc66889f))
* **internal:** remove mock server code ([1d57b8e](https://github.com/e-invoice-be/e-invoice-ts/commit/1d57b8e877d7307390b1f4167e3befc0fc50e30c))
* **internal:** show error causes in MCP servers when running in local mode ([b0b5388](https://github.com/e-invoice-be/e-invoice-ts/commit/b0b538829b8a4ce09c89b60a8769da542b78ef79))
* **internal:** support oauth authorization code flow for MCP servers ([0c668c7](https://github.com/e-invoice-be/e-invoice-ts/commit/0c668c761fd092c53172850963e53ad4551c23f1))
* **internal:** update `actions/checkout` version ([63aeb7e](https://github.com/e-invoice-be/e-invoice-ts/commit/63aeb7e9a584e3929abd8593c15b6cbbecea079a))
* **internal:** update dependencies to address dependabot vulnerabilities ([1813b2a](https://github.com/e-invoice-be/e-invoice-ts/commit/1813b2a60b3ce25a859f6643fe3d1c30cd7e71b0))
* **internal:** update lock file ([a4334a0](https://github.com/e-invoice-be/e-invoice-ts/commit/a4334a0fde83d955edd803c4c56aaa7cd1eaacfc))
* **internal:** upgrade babel, qs, js-yaml ([04b5b2b](https://github.com/e-invoice-be/e-invoice-ts/commit/04b5b2b8fc419ec572dc24f82a95a77cf53265c4))
* **mcp-server:** increase local docs search result count from 5 to 10 ([240cff2](https://github.com/e-invoice-be/e-invoice-ts/commit/240cff20940fe6a74e73e6a712cc1646c0fca21c))
* **mcp:** add intent param to execute tool ([2a6cb68](https://github.com/e-invoice-be/e-invoice-ts/commit/2a6cb68e6feb914f857c08cebbadf9f40e3ae102))
* **mcp:** correctly update version in sync with sdk ([6a4f117](https://github.com/e-invoice-be/e-invoice-ts/commit/6a4f11780ee05bab7fe08b1faa179deac7c585dc))
* **mcp:** forward STAINLESS_API_KEY to docs search endpoint ([2be51b9](https://github.com/e-invoice-be/e-invoice-ts/commit/2be51b9a56d40037626705c0d6984325e183f93b))
* **mcp:** pass intent param to execute handler ([475f523](https://github.com/e-invoice-be/e-invoice-ts/commit/475f5236e6b0ff9da166ac1b7d40cb521460dd2f))
* **mcp:** remove deprecated tool schemes ([dced858](https://github.com/e-invoice-be/e-invoice-ts/commit/dced858482108eeb03df11e874d1180547b811be))
* **mcp:** up tsconfig lib version to es2022 ([8e3ab9d](https://github.com/e-invoice-be/e-invoice-ts/commit/8e3ab9d5fa0d462a599c25e475c6722b14e0e2fd))
* **mcp:** upgrade dependencies ([2df3832](https://github.com/e-invoice-be/e-invoice-ts/commit/2df383238d2ebe9293617d2089844a30092e442b))
* update mock server docs ([478153a](https://github.com/e-invoice-be/e-invoice-ts/commit/478153aa77792f2c93767b47cff67514f3948856))


### Documentation

* prominently feature MCP server setup in root SDK readmes ([087adcb](https://github.com/e-invoice-be/e-invoice-ts/commit/087adcb924e9a565fc9f56e06c8300d5c19ee25d))
* update http mcp docs ([0954baf](https://github.com/e-invoice-be/e-invoice-ts/commit/0954bafa5e0fb946c052edf228d0b23014d0f58c))
* update logging docs ([566ee5d](https://github.com/e-invoice-be/e-invoice-ts/commit/566ee5de773bc778d9368d9d1619ec48d62c88d3))

## 1.25.0 (2025-12-18)

Full Changelog: [v1.24.2...v1.25.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.24.2...v1.25.0)

### Features

* **api:** api update ([ffba93c](https://github.com/e-invoice-be/e-invoice-ts/commit/ffba93c677a350ecccc8e446d827c853ab41d2df))


### Bug Fixes

* **mcp:** pass base url to code tool ([a83bd51](https://github.com/e-invoice-be/e-invoice-ts/commit/a83bd51cf7631289e612a4ff0dd4cef9e8e1cf64))

## 1.24.2 (2025-12-11)

Full Changelog: [v1.24.1...v1.24.2](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.24.1...v1.24.2)

### Bug Fixes

* **mcp:** add client instantiation options to code tool ([e42efc9](https://github.com/e-invoice-be/e-invoice-ts/commit/e42efc972f746d45ef4a9099add7baac40ccddd0))


### Chores

* **internal:** codegen related update ([598ae1b](https://github.com/e-invoice-be/e-invoice-ts/commit/598ae1b25720d247b083ec573e7c1fd34b5301b8))
* **mcp:** update lockfile ([f686b0c](https://github.com/e-invoice-be/e-invoice-ts/commit/f686b0c2295b470dbe4389be734daa275f27512b))

## 1.24.1 (2025-12-06)

Full Changelog: [v1.24.0...v1.24.1](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.24.0...v1.24.1)

### Bug Fixes

* **mcp:** correct code tool API endpoint ([e0bf0e2](https://github.com/e-invoice-be/e-invoice-ts/commit/e0bf0e2744e284b6cc97a111cf650efe4d8dce04))


### Chores

* **internal:** codegen related update ([959ab4b](https://github.com/e-invoice-be/e-invoice-ts/commit/959ab4b6e8df268d4744884449aeb33f1b92d3c0))

## 1.24.0 (2025-12-06)

Full Changelog: [v1.23.0...v1.24.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.23.0...v1.24.0)

### Features

* **mcp:** add typescript check to code execution tool ([0c104fd](https://github.com/e-invoice-be/e-invoice-ts/commit/0c104fd2c6260f79ef315ff9cd91215195f7707a))
* **mcp:** handle code mode calls in the Stainless API ([11a2c17](https://github.com/e-invoice-be/e-invoice-ts/commit/11a2c1733c1c6e2cfda8bcdf0f2c26728a74d7ad))
* **mcp:** return logs on code tool errors ([3b8850e](https://github.com/e-invoice-be/e-invoice-ts/commit/3b8850ee77a67eb8fe1c093eaf13239fd7c50b3f))


### Bug Fixes

* **mcp:** return correct lines on typescript errors ([c8ee0e7](https://github.com/e-invoice-be/e-invoice-ts/commit/c8ee0e73e0524087b1657d62ce17162d35ffa020))


### Chores

* **internal:** upgrade eslint ([885f3dd](https://github.com/e-invoice-be/e-invoice-ts/commit/885f3dd609fcd7be271216623ced30343ae0b019))
* use latest @modelcontextprotocol/sdk ([33bc1ad](https://github.com/e-invoice-be/e-invoice-ts/commit/33bc1adde3d8f443354f1d3265ba30199e773fce))

## 1.23.0 (2025-12-02)

Full Changelog: [v1.22.0...v1.23.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.22.0...v1.23.0)

### Features

* **mcp:** add detail field to docs search tool ([eef2599](https://github.com/e-invoice-be/e-invoice-ts/commit/eef2599a43845f871d02d4db01c002fefb51a8f8))


### Bug Fixes

* **mcp:** return tool execution error on api error ([571ac6d](https://github.com/e-invoice-be/e-invoice-ts/commit/571ac6d619e3a1e84045b9eaf495c3061f907ee9))


### Chores

* **client:** fix logger property type ([83ffeb2](https://github.com/e-invoice-be/e-invoice-ts/commit/83ffeb2c98645d6bb176fba2e603710ded2bbc48))

## 1.22.0 (2025-11-18)

Full Changelog: [v1.21.0...v1.22.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.21.0...v1.22.0)

### Features

* **api:** api update ([e24b28e](https://github.com/e-invoice-be/e-invoice-ts/commit/e24b28e7c130d120c602c9a7cab3264f6b653213))

## 1.21.0 (2025-11-14)

Full Changelog: [v1.20.0...v1.21.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.20.0...v1.21.0)

### Features

* **api:** api update ([eb6523a](https://github.com/e-invoice-be/e-invoice-ts/commit/eb6523a5a569b4344ef3b0cb9dae69ef7a08ea31))

## 1.20.0 (2025-11-14)

Full Changelog: [v1.19.0...v1.20.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.19.0...v1.20.0)

### Features

* **api:** api update ([8f8f1f4](https://github.com/e-invoice-be/e-invoice-ts/commit/8f8f1f419a52aa35cef819f5a1fe5b6f8c785cb5))

## 1.19.0 (2025-11-14)

Full Changelog: [v1.18.1...v1.19.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.18.1...v1.19.0)

### Features

* **api:** api update ([b79c4ef](https://github.com/e-invoice-be/e-invoice-ts/commit/b79c4efdf07c3f47bcdf53ca2449f1d989d22c9c))


### Chores

* **mcp:** upgrade jq-web ([8a6c089](https://github.com/e-invoice-be/e-invoice-ts/commit/8a6c08948d7e96d31c428eda7a599fad7666a329))

## 1.18.1 (2025-11-13)

Full Changelog: [v1.18.0...v1.18.1](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.18.0...v1.18.1)

### Bug Fixes

* **mcp:** return tool execution error on jq failure ([4a57db4](https://github.com/e-invoice-be/e-invoice-ts/commit/4a57db438443721a57c12d6e10b9939a8efb30ed))


### Chores

* **mcp:** clarify http auth error ([603e740](https://github.com/e-invoice-be/e-invoice-ts/commit/603e740f98925d91f1cb59076996f4e51471d0a0))

## 1.18.0 (2025-11-09)

Full Changelog: [v1.17.0...v1.18.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.17.0...v1.18.0)

### Features

* **api:** api update ([3988bb9](https://github.com/e-invoice-be/e-invoice-ts/commit/3988bb98b67e397f3437d2e6ec2b5f5f67a356a1))


### Chores

* **internal:** codegen related update ([ab5c026](https://github.com/e-invoice-be/e-invoice-ts/commit/ab5c026eca6ed052a59f3baabe1479faccfc8b8e))


### Documentation

* **mcp:** add a README link to add server to VS Code or Claude Code ([580777f](https://github.com/e-invoice-be/e-invoice-ts/commit/580777f060603012d30ad95addceeae3cd1a8d23))

## 1.17.0 (2025-11-06)

Full Changelog: [v1.16.1...v1.17.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.16.1...v1.17.0)

### Features

* **api:** api update ([a3fa416](https://github.com/e-invoice-be/e-invoice-ts/commit/a3fa416f88e4bbc88bbb8ff88b9455bb6a6d1c52))
* **mcp:** enable optional code execution tool on http mcp servers ([05f22de](https://github.com/e-invoice-be/e-invoice-ts/commit/05f22de4c8ac1e57a74774390a32265ff1ce9665))


### Chores

* **internal:** codegen related update ([73b1ffd](https://github.com/e-invoice-be/e-invoice-ts/commit/73b1ffdda5d257a8a4c7047c22c43e60b69d8dfb))
* **internal:** grammar fix (it's -&gt; its) ([f0fda39](https://github.com/e-invoice-be/e-invoice-ts/commit/f0fda39aeccefe68521330ed5ce117d2dc57d930))
* mcp code tool explicit error message when missing a run function ([c82464c](https://github.com/e-invoice-be/e-invoice-ts/commit/c82464cf41817eb26d79610c16b63b8c339c6b36))
* **mcp:** add friendlier MCP code tool errors on incorrect method invocations ([dc4785a](https://github.com/e-invoice-be/e-invoice-ts/commit/dc4785aabe8d38124aff8010115da93eeadc7486))
* **mcp:** add line numbers to code tool errors ([0702c8a](https://github.com/e-invoice-be/e-invoice-ts/commit/0702c8a2236032c46fc0f2691ed91a38684a21d5))
* use structured error when code execution tool errors ([0539766](https://github.com/e-invoice-be/e-invoice-ts/commit/0539766f785240edac610df8a6f232f9ad340ace))


### Documentation

* **mcp:** add a README button for one-click add to Cursor ([94152b3](https://github.com/e-invoice-be/e-invoice-ts/commit/94152b34b5368bde29b8ac6eb9c57bc52d23f849))

## 1.16.1 (2025-10-31)

Full Changelog: [v1.16.0...v1.16.1](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.16.0...v1.16.1)

### Bug Fixes

* **mcpb:** pin @anthropic-ai/mcpb version ([f3546c0](https://github.com/e-invoice-be/e-invoice-ts/commit/f3546c0fde2d6a7d42a0eb0698af8b7d7ed23001))

## 1.16.0 (2025-10-09)

Full Changelog: [v1.15.0...v1.16.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.15.0...v1.16.0)

### Features

* **api:** api update ([2a9a71a](https://github.com/e-invoice-be/e-invoice-ts/commit/2a9a71aeeb28253f768acec59cc44fac7afd6081))


### Chores

* extract some types in mcp docs ([c0fb9bb](https://github.com/e-invoice-be/e-invoice-ts/commit/c0fb9bbdddba6203ac12652e9fdd37806d88e08a))

## 1.15.0 (2025-10-08)

Full Changelog: [v1.14.0...v1.15.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.14.0...v1.15.0)

### Features

* **api:** manual updates ([c71c47e](https://github.com/e-invoice-be/e-invoice-ts/commit/c71c47efce57614e8db359ea1091fb443c77c4d4))

## 1.14.0 (2025-10-08)

Full Changelog: [v1.13.0...v1.14.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.13.0...v1.14.0)

### Features

* **api:** api update ([586824a](https://github.com/e-invoice-be/e-invoice-ts/commit/586824ac23cb07b96b0401f117d327ce73f452a1))

## 1.13.0 (2025-10-08)

Full Changelog: [v1.12.1...v1.13.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.12.1...v1.13.0)

### Features

* **api:** api update ([5984745](https://github.com/e-invoice-be/e-invoice-ts/commit/5984745faf29c0e199de9b4cff3c89aa26c312c2))


### Chores

* **internal:** remove .eslintcache ([55d122c](https://github.com/e-invoice-be/e-invoice-ts/commit/55d122c3d960a8af43860b0e18e36c85729938ce))
* **internal:** use npm pack for build uploads ([d37c95d](https://github.com/e-invoice-be/e-invoice-ts/commit/d37c95dbcf7b3f8125e3f4c1f3b08d9cdc32e970))
* **jsdoc:** fix [@link](https://github.com/link) annotations to refer only to parts of the package‘s public interface ([b3f482b](https://github.com/e-invoice-be/e-invoice-ts/commit/b3f482b7a72077a704ff0976eb599e32545aa4c7))

## 1.12.1 (2025-09-30)

Full Changelog: [v1.12.0...v1.12.1](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.12.0...v1.12.1)

### Bug Fixes

* **mcp:** fix cli argument parsing logic ([943a677](https://github.com/e-invoice-be/e-invoice-ts/commit/943a6777c4805891c5c2c8493d8238da673b3869))
* **mcp:** resolve a linting issue in server code ([a54a247](https://github.com/e-invoice-be/e-invoice-ts/commit/a54a247bb0056fc1bdf2e463744538b7961803a2))


### Performance Improvements

* faster formatting ([8e75d8d](https://github.com/e-invoice-be/e-invoice-ts/commit/8e75d8d8c09be7de8d6d36c081f52a33ae4b5be3))


### Chores

* **internal:** codegen related update ([da6b51f](https://github.com/e-invoice-be/e-invoice-ts/commit/da6b51f6e3aacba86bb3a3c3afde6da5dfefac17))
* **internal:** fix incremental formatting in some cases ([c533269](https://github.com/e-invoice-be/e-invoice-ts/commit/c533269f0438e39e9ee587797f1c8f9376cc61db))
* **internal:** ignore .eslintcache ([1b5b9fb](https://github.com/e-invoice-be/e-invoice-ts/commit/1b5b9fb9839b0826216f1ed6fbbed80410f252ac))
* **internal:** remove deprecated `compilerOptions.baseUrl` from tsconfig.json ([e3fac3c](https://github.com/e-invoice-be/e-invoice-ts/commit/e3fac3cdd8cc3e15c21a8716f565dd6be5025d41))
* **mcp:** allow pointing `docs_search` tool at other URLs ([ee2f6fb](https://github.com/e-invoice-be/e-invoice-ts/commit/ee2f6fbdb2a3eca7e830ab90a1e4ac28f47df469))
* update lockfile ([27f48e1](https://github.com/e-invoice-be/e-invoice-ts/commit/27f48e1568753461ca55f7a0934f9dc82a86fde1))

## 1.12.0 (2025-09-24)

Full Changelog: [v1.11.1...v1.12.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.11.1...v1.12.0)

### Features

* **api:** api update ([5abc8d5](https://github.com/e-invoice-be/e-invoice-ts/commit/5abc8d58050879bd3bb2a187be15605ec01f6b6b))
* **mcp:** add docs search tool ([0caa855](https://github.com/e-invoice-be/e-invoice-ts/commit/0caa855168dd834bf2d92dd8c1bedfaacfff5f42))
* **mcp:** add option for including docs tools ([403d6ef](https://github.com/e-invoice-be/e-invoice-ts/commit/403d6ef4f74766f6ba4a121c8b4df6d4433cb741))
* **mcp:** enable experimental docs search tool ([047d898](https://github.com/e-invoice-be/e-invoice-ts/commit/047d898441a82a11af9659030d74856bfc908de5))


### Chores

* **codegen:** internal codegen update ([fab2d80](https://github.com/e-invoice-be/e-invoice-ts/commit/fab2d8090532868995476d4f4455734ac5d2f675))
* do not install brew dependencies in ./scripts/bootstrap by default ([ca49c18](https://github.com/e-invoice-be/e-invoice-ts/commit/ca49c1895b1eda54e75c80317fe41268f54a24bf))
* **internal:** gitignore .mcpb files ([ccf21a2](https://github.com/e-invoice-be/e-invoice-ts/commit/ccf21a2da5f9137cce7a84c2b916fe2f7c5e7f27))
* **mcp:** rename dxt to mcpb ([a5c5bb5](https://github.com/e-invoice-be/e-invoice-ts/commit/a5c5bb566c0b626e10ef098a330f32cafc6f0e03))

## 1.11.1 (2025-09-17)

Full Changelog: [v1.11.0...v1.11.1](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.11.0...v1.11.1)

### Bug Fixes

* **ci:** set permissions for DXT publish action ([8501c57](https://github.com/e-invoice-be/e-invoice-ts/commit/8501c57395099a49b8b49b078735489b08d39a06))

## 1.11.0 (2025-09-16)

Full Changelog: [v1.10.1...v1.11.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.10.1...v1.11.0)

### Features

* **api:** api update ([a93b150](https://github.com/e-invoice-be/e-invoice-ts/commit/a93b1509cbc7129f7c904874fb1c3a20373daba3))

## 1.10.1 (2025-09-12)

Full Changelog: [v1.10.0...v1.10.1](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.10.0...v1.10.1)

### Bug Fixes

* **mcp:** fix uploading dxt release assets ([223ea0d](https://github.com/e-invoice-be/e-invoice-ts/commit/223ea0d3b3a53125d31045f150c57fab48eba04c))


### Chores

* **internal:** codegen related update ([eb92c9c](https://github.com/e-invoice-be/e-invoice-ts/commit/eb92c9cddb050f9288b4759846a0d728fc2108fe))
* **internal:** codegen related update ([040086b](https://github.com/e-invoice-be/e-invoice-ts/commit/040086b83feeaf0211993e7534ddcad1c3481f4f))

## 1.10.0 (2025-09-06)

Full Changelog: [v1.9.0...v1.10.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.9.0...v1.10.0)

### Features

* **mcp:** allow setting logging level ([5a1c13c](https://github.com/e-invoice-be/e-invoice-ts/commit/5a1c13cd5254e2e9b4c567a87c3db6d5e828a69f))
* **mcp:** expose client options in `streamableHTTPApp` ([5b8eddf](https://github.com/e-invoice-be/e-invoice-ts/commit/5b8eddf4748f277e8bd5a30b0eee97055ba1890e))


### Bug Fixes

* **mcp:** fix query options parsing ([a9ada2c](https://github.com/e-invoice-be/e-invoice-ts/commit/a9ada2c3d8bea180f0739f2409815edbbb460452))


### Chores

* ci build action ([d5fe12a](https://github.com/e-invoice-be/e-invoice-ts/commit/d5fe12aefff64ae51bfde3fe38a9a057775bd760))
* **internal:** codegen related update ([ba8a085](https://github.com/e-invoice-be/e-invoice-ts/commit/ba8a085e0c068000a6300b31ab4da02c2e9a3f7b))
* **internal:** codegen related update ([bfe5f2a](https://github.com/e-invoice-be/e-invoice-ts/commit/bfe5f2a920d6303f514ed3b4fae1b3f70da58d15))

## 1.9.0 (2025-09-02)

Full Changelog: [v1.8.0...v1.9.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.8.0...v1.9.0)

### Features

* **api:** api update ([8e256ea](https://github.com/e-invoice-be/e-invoice-ts/commit/8e256eab938256a1ff474859860f32528a163bf8))


### Chores

* **internal:** update global Error reference ([0ad4351](https://github.com/e-invoice-be/e-invoice-ts/commit/0ad435190779f00786789cf95ee8d92b8adb88aa))

## 1.8.0 (2025-08-24)

Full Changelog: [v1.7.2...v1.8.0](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.7.2...v1.8.0)

### Features

* **mcp:** add code execution tool ([aef52f1](https://github.com/e-invoice-be/e-invoice-ts/commit/aef52f12ee11b193981ebef249fab09b2e61dcae))
* **mcp:** add option to infer mcp client ([204b28d](https://github.com/e-invoice-be/e-invoice-ts/commit/204b28d7c8e1971398cf59739c2ee720fdef3780))
* **mcp:** parse query string as mcp client options in mcp server ([a5dc0ea](https://github.com/e-invoice-be/e-invoice-ts/commit/a5dc0ea055231586adfebe799c36f083a3d98e93))


### Chores

* add package to package.json ([da9920e](https://github.com/e-invoice-be/e-invoice-ts/commit/da9920e19fbaa085fb0b2e1fe410f55b73689f76))
* **client:** qualify global Blob ([f4c9d18](https://github.com/e-invoice-be/e-invoice-ts/commit/f4c9d18256ebab72728c5a2278257140ef90440b))
* **deps:** update dependency @types/node to v20.17.58 ([bcab852](https://github.com/e-invoice-be/e-invoice-ts/commit/bcab85293a7b67a4d318901f7608a64f6c225411))
* **internal:** codegen related update ([8e38b25](https://github.com/e-invoice-be/e-invoice-ts/commit/8e38b25d677ed46d131ace617c5ff751ea58802c))
* **internal:** codegen related update ([0de2cc1](https://github.com/e-invoice-be/e-invoice-ts/commit/0de2cc1eb377f7a129d78c5aab259975cd1413c0))
* **internal:** formatting change ([5839fb7](https://github.com/e-invoice-be/e-invoice-ts/commit/5839fb7224bfee17c53b4d77366a821a7dd38080))
* **internal:** make mcp-server publishing public by defaut ([9693e5b](https://github.com/e-invoice-be/e-invoice-ts/commit/9693e5b1fc936f005f4697df23b7a06b32f196ef))
* **internal:** refactor array check ([7597d5f](https://github.com/e-invoice-be/e-invoice-ts/commit/7597d5f530fd3b44e55396baebaf776da33950e4))
* **mcp:** add cors to oauth metadata route ([21ae217](https://github.com/e-invoice-be/e-invoice-ts/commit/21ae217e618ff6cf8a589e2fce2aeeee6160552e))
* **mcp:** document remote server in README.md ([d0da026](https://github.com/e-invoice-be/e-invoice-ts/commit/d0da0264257658c6dfd2189b13670228ce9aa296))
* **mcp:** update package.json ([7504ed6](https://github.com/e-invoice-be/e-invoice-ts/commit/7504ed63e8e9fb0e860f830728bcbffc598d2e45))
* **mcp:** update README ([bc688d7](https://github.com/e-invoice-be/e-invoice-ts/commit/bc688d7388dc27bc88a8a6fea428ecb13b6f678d))
* **mcp:** update types ([0f714e7](https://github.com/e-invoice-be/e-invoice-ts/commit/0f714e788de591e6008475354154b571cefa7976))
* update CI script ([7de9a05](https://github.com/e-invoice-be/e-invoice-ts/commit/7de9a057c8f5bf510c54df67387bef3af2c63253))

## 1.7.2 (2025-08-14)

Full Changelog: [v1.7.1...v1.7.2](https://github.com/e-invoice-be/e-invoice-ts/compare/v1.7.1...v1.7.2)

### Chores

* **internal:** codegen related update ([7f93bcf](https://github.com/e-invoice-be/e-invoice-ts/commit/7f93bcfe9952ee40cec1d100fbcce251c8b7057b))
* **internal:** update comment in script ([5dafb5e](https://github.com/e-invoice-be/e-invoice-ts/commit/5dafb5ed5fc0476b996e7a2fb6adcafbeba7dfdb))
* **mcp:** minor cleanup of types and package.json ([3f75544](https://github.com/e-invoice-be/e-invoice-ts/commit/3f75544a65ca50685e60e5cd452769989ba45ea1))
* update @stainless-api/prism-cli to v5.15.0 ([7f6706a](https://github.com/e-invoice-be/e-invoice-ts/commit/7f6706a4bcf152919649348f4bd930435cdf5288))

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
