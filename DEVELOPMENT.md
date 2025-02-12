# Contributing to the SnapWP Framework

Code contributions, bug reports, and feature requests are welcome! The following sections provide guidelines for contributing to this project, as well as information about development processes and testing.

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

## Setting up locally

To set up locally, clone the repository and navigate to the `frontend` subdirectory.

### Prerequisites

-   [Node.js](https://nodejs.org/) v20+
-   [Docker](https://www.docker.com/)

### Setup

1. Copy the example environment file to `.env` and update the values as needed.

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

5. Publish packages locally.

    ```bash
    npm run publish:local
    ```

Alternatively, you could build the packages in watch mode:

```bash
npm run dev
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

#### Testing with Playwright.

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

### Testing packages locally

You can test these packages locally by linking them, or by using a local npm registry such as Verdaccio.

#### Using linking (recommended for local development)

1. Follow steps 1–3 in [Setup](#setup).
2. Run `npm link -w snapwp` to link the package into your global dependencies.
3. Verify the CLI by running `snapwp`.
4. Remove the global link with `npm r snapwp -g`.

#### Using Verdaccio (recommended for pre-release testing)

1. Follow steps 1–4 in [Setup](#setup).
2. Use `npm_config_registry=http://localhost:4873 npx snapwp` to run the local package.
3. Clear the npx cache if needed:
    - Find your cache location using `npm config get cache`.
    - Remove the `_npx` directory in that cache folder.

#### Using the packages in `/examples/`

@todo

### Releasing

As will all other Code Contributions, the release process is managed through Pull Requests. When you are ready to make a release, create a new branch from `develop` and make the necessary changes, and then create a PR.

Once the PR is merged, you should push a copy of the `develop` branch to the `main` branch.
