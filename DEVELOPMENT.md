# Contributing to the SnapWP Framework

Code contributions, bug reports, and feature requests are welcome! The following sections provide guidelines for contributing to this project, as well as information about development processes and testing.

## Table of Contents

-   [Directory Structure](#directory-structure)
-   [Local setup](#local-setup)
    -   [Prerequisites](#prerequisites)
    -   [Building SnapWP Packages](#building-snapwp-packages)
-   [Code Contributions (Pull Requests)](#code-contributions-pull-requests)
    -   [Workflow](#workflow)
    -   [Code Quality / Code Standards](#code-quality--code-standards)
        -   [ESLint](#eslint)
    -   [Testing](#testing)
        -   [Testing with Jest](#testing-with-jest)
        -   [Testing with Playwright](#testing-with-playwright)
    -   [Type checking](#type-checking)
    -   [Testing packages locally](#testing-packages-locally)
        -   [Package linking](#package-linking)
        -   [Verdaccio proxy registry](#verdaccio-proxy-registry)
    -   [Changesets](#changesets)
    -   [Releasing](#releasing)

## Directory Structure

The monorepo is organized as follows:

<details>
<summary> Click to expand </summary>

```log
│  # Repository files
├── .github/
│
│  # Verdaccio configuration for local package testing
├── .verdaccio/
│
│   # Global config files reused in multiple packages
├── config/
│   ├── .babelrc             # Babel config for transpiling unit test files
│   ├── .prettierrc.js       # Prettier config extending WordPress defaults
│   ├── jest.config.js       # Unit tests config
│   ├── playwright.config.js # E2E tests config. Any file with the name *.spec.ts will be considered as an E2E test
│   └── tsconfig.base.json   # A base Typescript config for all modules to inherit from
│
│  # Framework documentation
├── docs/
│
│  # Example implementations and starter templates
├── examples/
│   └── nextjs/starter/  # A basic Next.js starter template
│
│  # E2E tests using Playwright
├── e2e-tests/
│
│  # Contains all the modules (libraries and apps) for the project
├── packages/
│   ├── blocks          # Consumable WordPress blocks for frontend use
│   ├── cli             # CLI commands for `npx snapwp`
│   ├── codegen-config  # GraphQL code generation configuration
│   ├── core            # Core functionality shared by the SnapWP framework
│   ├── eslint-config   # Shared ESLint configuration for all packages
│   ├── next            # Utilities and frontend components for integrating with Next.js
│   ├── prettier-config # Shared Prettier configuration
│   └── query           # GraphQL queries for WordPress data fetching
│
├── .env.example   # Example .env file for local development. Copy this to .env and customize as needed
├── .eslintrc.json # Global ESLint configuration
├── DEVELOPMENT.md # 🎯 This file
├── package.json   # Global package.json for the monorepo.
└── tsconfig.json  # Global Typescript configuration
```

</details>

## Local setup

To set up locally, clone the repository and navigate to the `frontend` subdirectory.

### Prerequisites

-   [Node.js](https://nodejs.org/) v20+
-   [Docker](https://www.docker.com/)

### Building SnapWP Packages

1. Copy the example environment file to `.env` and update the [values as needed](./docs/config-api.md#env-variables)

    ```bash
    cp .env.example .env
    ```

2. Use the node version defined in .nvmrc.

    ```bash
    nvm use
    ```

3. Install the NPM dependencies.

    ```bash
    npm install
    ```

4. Build the packages.

    ```bash
    npm run build
    ```

    OR

    Build in watch mode:

    ```bash
    npm run dev
    ```

At this point the packages should be ready to use in the repository, such as linting/typechecking, IDE support, and the projects in the [`./examples`](./examples) directory.

5. (Optional) Link the `snapwp` command.

    To test the local versions of [`./packages/cli`], you can link it to your global NPM packages:

    ```bash
    npm link snapwp
    ```

    Unlink it by

    ```bash
    npm r snapwp -g
    ```

    For more information see CLI's [Readme](./packages/cli/README.md) file.

6. (Optional) Publish to local Verdaccio registry.

    The following command starts a Verdaccio proxy server on docker and then builds and publishes the packages to the local Verdaccio registry.

    ```bash
    npm run publish:local
    ```

    For more information see [@todo]

7. (Optional) Scaffold a new project using the local CLI & packages.

    After the `snapwp` command is linked (Step 5) and the packages are published to the local Verdaccio registry (Step 6), you can scaffold a new project using the local CLI and packages with the following command.

    ```bash
    snapwp --proxy
    ```

## Code Contributions (Pull Requests)

### Workflow

The `develop` branch is used for active development, while `main` contains the current stable release. Always create a new branch from `develop` when working on a new feature or bug fix.

Branches should be prefixed with the type of change (e.g. `feat`, `chore`, `tests`, `fix`, etc.) followed by a short description of the change. For example, a branch for a new feature called "Add new feature" could be named `feat/add-new-feature`.

### Code Quality / Code Standards

This project uses several tools to ensure code quality and standards are maintained:

#### ESLint

This project uses [ESLint](https://eslint.org), which is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

You can run ESLint using the following command:

```bash
npm run lint
```

ESLint can automatically fix some issues. To fix issues automatically, run:

```bash
npm run lint:fix
```

### Testing

#### Testing with Jest

This project uses [Jest](https://jestjs.io/) to run unit tests
.
Unit tests are located inside the /packages/\*\*/test/ directory

To run the unit tests, run:

```bash
npm run test:unit
```

To generate coverage report, run:

```bash
npm run test:unit:coverage
```

To update the snapshot, run:

```bash
npm run test:unit:updatesnapshot
```

Note: Update snapshots when a test fails due to intentional changes in the code.

#### Testing with Playwright

This project uses [Playwright](https://playwright.dev/) to run e2e tests.

Tests are located in the [`e2e-tests`](./e2e-tests) directory.

To run the Playwright tests, run:

```bash
npm run test:e2e
```

### Type checking

You can run type check for all packages:

```bash
npm run typecheck
```

### Changesets

This project uses [Changesets](https://github.com/changesets/changesets) for versioning and generating changelogs across the packages in the monorepo.

To generate a Changeset (_copied and modified from [Changesets' docs](https://github.com/changesets/changesets/blob/01c037c0462540196b5d3d0c0241d8752b465b4b/docs/adding-a-changeset.md)_):

1. Run `npm run changeset` in the root of the monorepo.
2. Select the packages you want to include in the changeset.
    - Use `↑` and `↓` to navigate to packages.
    - Use `space` to select a package.
    - Hit `enter` when all desired packages are selected.
3. You will be prompted to select a bump type for each selected package. First you will flag all the packages that should receive a `major` bump, then `minor`. The remaining packages will receive a `patch` bump.

    - **Major**: Any form of breaking change.
    - **Minor**: New (non-breaking) features or changes.
    - **Patch**: Bug fixes.

4. Your final prompt will be to provide a message to go along with the changeset. This message will be written to the changeset when the next release is made.

    > ⚠️ **Important**
    >
    > Remember to follow [Conventional Commits formatting](https://www.conventionalcommits.org/en/v1.0.0/) and to use imperative language in your changeset message.
    >
    > For example, "feat: Add new feature" instead of "Added new feature".

    After this, a new changeset will be added which is a markdown file with YAML front matter.

    ```
    -| .changeset/
    -|-| UNIQUE_ID.md
    ```

    The message you typed can be found in the markdown file. If you want to expand on it, you can write as much markdown as you want, which will all be added to the changelog on publish. If you want to add more packages or change the bump types of any packages, that's also fine.

5. Once you are happy with the changeset, commit the file to your branch.

### Releasing

This project uses [Changesets](#changesets) to manage releases.

Once all the latest version of the packages are ready to be released and all the [changesets are generated](#changesets), the generated `chore: Release packages 🏷️` PR should be reviewed and approved. Merging the PR will release the packages to NPM and tag + publish the corresponding GitHub releases.
