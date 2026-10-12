## Setting up the environment

This repository uses [`yarn@v1`](https://classic.yarnpkg.com/lang/en/docs/install).
Other package managers may work but are not officially supported for development.

To set up the repository, run:

```sh
$ yarn
$ yarn build
```

This will install all the required dependencies and build output files to `dist/`.

## Modifying/Adding code

All code in this repository is maintained by hand. There is no code generator: edit the files in `src/`,
`tests/` and `packages/mcp-server/` directly and open a pull request.

Use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages and pull request titles
(`feat: …`, `fix: …`, `docs: …`, `chore: …`; add `!` or a `BREAKING CHANGE:` footer for a breaking change).
The release tooling reads these messages to calculate the next version and to write `CHANGELOG.md`.

## Adding and running examples

You can freely edit or add files in the `examples/` directory.

```ts
// add an example to examples/<your-example>.ts

#!/usr/bin/env -S npm run tsn -T
…
```

```sh
$ chmod +x examples/<your-example>.ts
# run the example against your api
$ yarn tsn -T examples/<your-example>.ts
```

## Using the repository from source

If you’d like to use the repository from source, you can either install from git or link to a cloned repository:

To install via git:

```sh
$ npm install git+ssh://git@github.com:e-invoice-be/e-invoice-ts.git
```

Alternatively, to link a local copy of the repo:

```sh
# Clone
$ git clone https://www.github.com/e-invoice-be/e-invoice-ts
$ cd e-invoice-ts

# With yarn
$ yarn link
$ cd ../my-package
$ yarn link e-invoice-api

# With pnpm
$ pnpm link --global
$ cd ../my-package
$ pnpm link --global e-invoice-api
```

## Running tests

```sh
$ yarn run test
```

## Linting and formatting

This repository uses [prettier](https://www.npmjs.com/package/prettier) and
[eslint](https://www.npmjs.com/package/eslint) to format the code in the repository.

To lint:

```sh
$ yarn lint
```

To format and fix all lint issues automatically:

```sh
$ yarn fix
```

## Publishing and releases

Releases are automated with [release-please](https://github.com/googleapis/release-please). The configuration
is in `release-please-config.json`, and `.release-please-manifest.json` holds the last released version.

### Release flow

1. A push to `main` starts the [`Release Please` workflow](https://github.com/e-invoice-be/e-invoice-ts/actions/workflows/release-please.yml).
2. The workflow opens or updates the release pull request (`release: <version>`). This pull request contains
   the version bump (`package.json`, `src/version.ts`, `packages/mcp-server/`) and the new `CHANGELOG.md` entries.
   A `fix` gives a patch version, a `feat` gives a minor version, and a breaking change gives a major version.
3. A maintainer merges the release pull request.
4. The subsequent run of the workflow creates the git tag `v<version>` and the GitHub release.
5. The same run then starts the [`Publish NPM` workflow](https://github.com/e-invoice-be/e-invoice-ts/actions/workflows/publish-npm.yml).
   That workflow publishes `e-invoice-api` and `e-invoice-api-mcp` to npm and attaches the MCP bundle
   (`e_invoice_api_api.mcpb`) to the GitHub release.

Do not create tags or GitHub releases by hand, and do not edit the version numbers by hand.

### Required repository configuration

- **npm trusted publishing**: the publish uses no npm token. On npmjs.com, each of the packages `e-invoice-api`
  and `e-invoice-api-mcp` must have a trusted publisher (_Settings → Trusted Publisher → GitHub Actions_) with
  organization `e-invoice-be`, repository `e-invoice-ts` and workflow filename `publish-npm.yml`. Do not set
  an environment name.
- **Permission to open the release pull request**: use one of these two options.
  1. Enable _Settings → Actions → General → Allow GitHub Actions to create and approve pull requests_. The
     workflow then uses the default `GITHUB_TOKEN`. GitHub does not start other workflows for pull requests
     that this token creates, so the release pull request gets no CI run. `main` is already tested, and the
     release pull request changes only version numbers and the changelog.
  2. Add the secret `RELEASE_PLEASE_TOKEN` with a fine-grained personal access token or a GitHub App token
     (repository permissions: Contents, Pull requests and Issues, all read and write). The workflow prefers
     this secret. CI then also runs on the release pull request.

### Publish again with a GitHub workflow

If the npm publish failed, run [the `Publish NPM` workflow](https://github.com/e-invoice-be/e-invoice-ts/actions/workflows/publish-npm.yml)
manually. Set `tag` to the release tag (for example `v2.1.0`) to publish exactly that release and to upload the
MCP bundle to it. Set `path` to `.` or `packages/mcp-server` to publish only one package; npm refuses a version
that is already published.

### Publish manually

If you need to manually release a package, you can run the `bin/publish-npm` script with an `NPM_TOKEN` set on
the environment (an npm token that can publish the package). Run it from the package directory (the repository root or `packages/mcp-server`).
