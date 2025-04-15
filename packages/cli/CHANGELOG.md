# Changelog

## 0.2.1

### Patch Changes

-   [#141](https://github.com/rtCamp/snapwp/pull/141) [`6324467`](https://github.com/rtCamp/snapwp/commit/6324467c240af53c5c5ffd689d39817a9c0e7a45) Thanks [@ayushnirwal](https://github.com/ayushnirwal)! - chore: Add `eslint-plugin-import` to repository ruleset and lint.

-   [#156](https://github.com/rtCamp/snapwp/pull/156) [`5b51741`](https://github.com/rtCamp/snapwp/commit/5b51741b91a0a8e5f9abe0edb95703b906687847) Thanks [@Ta5r](https://github.com/Ta5r)! - chore: Enforce `@typescript-eslint/no-empty-function` ESLint rule in repository ruleset.

-   [#139](https://github.com/rtCamp/snapwp/pull/139) [`7081895`](https://github.com/rtCamp/snapwp/commit/7081895ecee799cf02b54c23bd4a2e71ae642ec0) Thanks [@ashutoshgautams](https://github.com/ashutoshgautams)! - fix: Improve formatting of default value and user input in CLI prompts.

-   [#157](https://github.com/rtCamp/snapwp/pull/157) [`278ef2c`](https://github.com/rtCamp/snapwp/commit/278ef2cd96208b89689a4963e69713dcb6fa19eb) Thanks [@justlevine](https://github.com/justlevine)! - chore: update NPM devDependencies to their latest (SemVer-compatible) versions.

-   [#140](https://github.com/rtCamp/snapwp/pull/140) [`211a7e5`](https://github.com/rtCamp/snapwp/commit/211a7e53bd8f191aa3bc03fb4bc0316530b40cda) Thanks [@Swanand01](https://github.com/Swanand01)! - feat: Convert CLI to TypeScript

-   [#139](https://github.com/rtCamp/snapwp/pull/139) [`7081895`](https://github.com/rtCamp/snapwp/commit/7081895ecee799cf02b54c23bd4a2e71ae642ec0) Thanks [@ashutoshgautams](https://github.com/ashutoshgautams)! - dev: Install NPM dependencies when scaffolding a new project with `npx snapwp`.
    dev: Add a `--skip-install` flag to the `npx snapwp` command to skip installing NPM dependencies.

-   [#155](https://github.com/rtCamp/snapwp/pull/155) [`e06f797`](https://github.com/rtCamp/snapwp/commit/e06f79752d8a63d83329c1b1601a3c7aea66e698) Thanks [@Ta5r](https://github.com/Ta5r)! - chore: Enforce `no-require-imports` ESLint rule in repository ruleset.

## 0.2.0

### Minor Changes

-   [#111](https://github.com/rtCamp/snapwp/pull/111) [`57f3c09`](https://github.com/rtCamp/snapwp/commit/57f3c098ba238acb89c43ea52c588e09094ae7d5) Thanks [@SH4LIN](https://github.com/SH4LIN)! - feat!: Add and improve robust WordPress and internal URI handling.

    **Breaking Changes:**

    The [Environment Variables and Config API](../docs/config-api.md) have been updated, with many of the variables renamed or removed. Please review the updated documentation for the latest changes.

    | Old value                             | Replace with                     |
    | ------------------------------------- | -------------------------------- |
    | NEXT_PUBLIC_URL                       | NEXT_PUBLIC_FRONTEND_URL         |
    | NEXT_PUBLIC_WORDPRESS_URL             | NEXT_PUBLIC_WP_HOME_URL          |
    | NEXT_PUBLIC_WORDPRESS_UPLOADS_PATH    | NEXT_PUBLIC_WP_UPLOADS_DIRECTORY |
    | NEXT_PUBLIC_WORDPRESS_REST_URL_PREFIX | NEXT_PUBLIC_REST_URL_PREFIX      |
    | getConfig().nextUrl                   | getConfig().frontendUrl          |
    | getConfig().homeUrl                   | getConfig().wpHomeUrl            |

### Patch Changes

-   [#119](https://github.com/rtCamp/snapwp/pull/119) [`f5ef79a`](https://github.com/rtCamp/snapwp/commit/f5ef79a83f3f13fead3ee3075a32c4f7533ff525) Thanks [@SH4LIN](https://github.com/SH4LIN)! - feat: load default favicon metadata from WordPress

-   [#124](https://github.com/rtCamp/snapwp/pull/124) [`c031942`](https://github.com/rtCamp/snapwp/commit/c031942f387d7699be54f068e84dbbcac005025b) Thanks [@justlevine](https://github.com/justlevine)! - dev: Refactor CLI script to support default prompt values and improve maintainability.

-   [#133](https://github.com/rtCamp/snapwp/pull/133) [`ba300f9`](https://github.com/rtCamp/snapwp/commit/ba300f984bfbff8cd18f5517250d55d54b1562b7) Thanks [@Swanand01](https://github.com/Swanand01)! - fix: Bump `next` package to version `15.2.3` to fix the CVE-2025-29927 vulnerability

## 0.1.2

### Patch Changes

-   [#116](https://github.com/rtCamp/snapwp/pull/116) [`e7d4a56`](https://github.com/rtCamp/snapwp/commit/e7d4a56b1a6cf230bca87a25a4ac25b69180cabe) Thanks [@Pathan-Amaankhan](https://github.com/Pathan-Amaankhan)! - chore: Apply and enforce ESLint rules to `bin` and `cli` files

## 0.1.1

### Patch Changes

-   [#109](https://github.com/rtCamp/snapwp/pull/109) [`e31540c`](https://github.com/rtCamp/snapwp/commit/e31540cb97091eca81f02d824b4c58eb9fa71f5e) Thanks [@ashutoshgautams](https://github.com/ashutoshgautams)! - docs: Add directory structure `examples/nextjs/starter` readme.

## 0.1.0

### Minor Changes

-   [#81](https://github.com/rtCamp/snapwp/pull/81) [`2595e37`](https://github.com/rtCamp/snapwp/commit/2595e376efb9a24b9caa0be9146976ec1386ffc4) Thanks [@justlevine](https://github.com/justlevine)! - chore: SemVer bump to 0.1.0

### Patch Changes

-   [#77](https://github.com/rtCamp/snapwp/pull/77) [`a3c3f6b`](https://github.com/rtCamp/snapwp/commit/a3c3f6b27994b1c5fee555e23c4ea40f7b88667a) Thanks [@SH4LIN](https://github.com/SH4LIN)! - feat: Improve handling of GraphQL errors and the Error Boundary UI.

-   [#80](https://github.com/rtCamp/snapwp/pull/80) [`777305f`](https://github.com/rtCamp/snapwp/commit/777305fcfe0ac104fc0259f81a1ec93451e14b50) Thanks [@justlevine](https://github.com/justlevine)! - chore: Update `snapwp` package readme

-   [#76](https://github.com/rtCamp/snapwp/pull/76) [`4ded470`](https://github.com/rtCamp/snapwp/commit/4ded47012041099e01c8231cfa367c389de10171) Thanks [@justlevine](https://github.com/justlevine)! - chore: remove the NextJS example's package-lock.json from VCS.

## 0.0.6

### Patch Changes

-   docs: Update, backfill, and cleanup readmes
-   chore: Cleanup tsconfig rulesets and remediate unearthed issues

## 0.0.4 - 2025-02-07

-   fix: improve cross-platform compatibility for the `snapwp` command

## 0.0.3 - 2025-02-03

-   fix: update regex in `snapwp` command to avoid `node_modules`
-   chore: add missing namespace proxies to Verdaccio config

## 0.0.2 - 2025-01-31

-   fix: remove internal `npm install` command to prevent dependency conflicts with the script.
-   docs: add local README.md to the package
-   docs: fix references to `npx snapwp`

## 0.0.1 - 2025-01-30

-   Initial (public) release.
