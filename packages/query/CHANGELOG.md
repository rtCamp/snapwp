# Changelog

## 1.0.0

### Minor Changes

-   [#123](https://github.com/rtCamp/snapwp/pull/123) [`0ff49b6`](https://github.com/rtCamp/snapwp/commit/0ff49b60a919b005a04754d7a982973a84e902be) Thanks [@Swanand01](https://github.com/Swanand01)! - feat: Add SEO support for core WordPress metadata.

-   [#144](https://github.com/rtCamp/snapwp/pull/144) [`87f8f56`](https://github.com/rtCamp/snapwp/commit/87f8f5600039e7f72f0146f3dc1f0c77ead946bd) Thanks [@SH4LIN](https://github.com/SH4LIN)! - feat!: Refactor the Query Engine for composability and release `@snapwp/plugin-apollo-client` and `@snapwp/plugin-tanstack-query` adapters.

### Patch Changes

-   [#170](https://github.com/rtCamp/snapwp/pull/170) [`cf1b672`](https://github.com/rtCamp/snapwp/commit/cf1b6728876601313697a9cc6a107d19c680db20) Thanks [@SH4LIN](https://github.com/SH4LIN)! - fix: restore `no-cache` policy when using `plugin-apollo-client`

-   [#171](https://github.com/rtCamp/snapwp/pull/171) [`1e96a8b`](https://github.com/rtCamp/snapwp/commit/1e96a8bc9450fef814d7452f7495f85e84a8a454) Thanks [@Swanand01](https://github.com/Swanand01)! - feat: Add support for both NEXT*PUBLIC* prefixed and non-prefixed ENV variables

-   [#174](https://github.com/rtCamp/snapwp/pull/174) [`1580854`](https://github.com/rtCamp/snapwp/commit/1580854334ef3e98d2501f418572f9dac139721a) Thanks [@justlevine](https://github.com/justlevine)! - dev: Include GraphQL `id` fields on all GraphQL nodes

-   [#163](https://github.com/rtCamp/snapwp/pull/163) [`95d3615`](https://github.com/rtCamp/snapwp/commit/95d36152bc627b044105d701dc7bdbad8ea063cc) Thanks [@Ta5r](https://github.com/Ta5r)! - tests: backfill test for `generateRootQuery` and `generateTemplateQuery` utils function.

-   [#176](https://github.com/rtCamp/snapwp/pull/176) [`f09a820`](https://github.com/rtCamp/snapwp/commit/f09a820bec4cd972ae9e897aa13cf25ae6c54e27) Thanks [@justlevine](https://github.com/justlevine)! - chore: fix and update NPM dependencies

-   [#151](https://github.com/rtCamp/snapwp/pull/151) [`693252c`](https://github.com/rtCamp/snapwp/commit/693252c8bbaaedcc46d8f5958ef49b0c952cd408) Thanks [@Swanand01](https://github.com/Swanand01)! - dev: Expose `QueryEngine.getTemplateData().is404` for custom HTTP status code handling.

-   Updated dependencies [[`0ff49b6`](https://github.com/rtCamp/snapwp/commit/0ff49b60a919b005a04754d7a982973a84e902be), [`1e96a8b`](https://github.com/rtCamp/snapwp/commit/1e96a8bc9450fef814d7452f7495f85e84a8a454), [`4ef89bd`](https://github.com/rtCamp/snapwp/commit/4ef89bdee915831dcd9fb0d40aaa2aec71dea7a0), [`9576cf4`](https://github.com/rtCamp/snapwp/commit/9576cf4ad0032a3f8ee9be4831d642baffe2bfbe), [`87f8f56`](https://github.com/rtCamp/snapwp/commit/87f8f5600039e7f72f0146f3dc1f0c77ead946bd), [`f09a820`](https://github.com/rtCamp/snapwp/commit/f09a820bec4cd972ae9e897aa13cf25ae6c54e27)]:
    -   @snapwp/core@0.4.0

## 0.3.1

### Patch Changes

-   [#154](https://github.com/rtCamp/snapwp/pull/154) [`22ed5d2`](https://github.com/rtCamp/snapwp/commit/22ed5d2f0b5319adae08be211c70ed929ee626c8) Thanks [@Swanand01](https://github.com/Swanand01)! - fix: use NEXT_PUBLIC_SITE_URL for GraphQL endpoint when available.

-   [#138](https://github.com/rtCamp/snapwp/pull/138) [`9ddaf7c`](https://github.com/rtCamp/snapwp/commit/9ddaf7c89a243370afb06894e4ed9d5bde2d5e45) Thanks [@SH4LIN](https://github.com/SH4LIN)! - fix: ensure `npm run typecheck` scans all packages.

-   [#141](https://github.com/rtCamp/snapwp/pull/141) [`6324467`](https://github.com/rtCamp/snapwp/commit/6324467c240af53c5c5ffd689d39817a9c0e7a45) Thanks [@ayushnirwal](https://github.com/ayushnirwal)! - chore: Add `eslint-plugin-import` to repository ruleset and lint.

-   [#147](https://github.com/rtCamp/snapwp/pull/147) [`bae4118`](https://github.com/rtCamp/snapwp/commit/bae41180f8012b0232f0c87a3c9e470d56603ff2 Thanks [@ta5r](https://github.com/ta5r)! - chore: Enforce named exports and remove default exports.

-   [#142](https://github.com/rtCamp/snapwp/pull/142) [`c460b31`](https://github.com/rtCamp/snapwp/commit/c460b31679ea6c1817b8a340cb180c180c17a362) Thanks [@Ta5r](https://github.com/Ta5r)! - chore: Enforce `jsdoc/require-param-type` ESLint rule in repository ruleset.

-   Updated dependencies [[`6324467`](https://github.com/rtCamp/snapwp/commit/6324467c240af53c5c5ffd689d39817a9c0e7a45), [`22ed5d2`](https://github.com/rtCamp/snapwp/commit/22ed5d2f0b5319adae08be211c70ed929ee626c8), [`278ef2c`](https://github.com/rtCamp/snapwp/commit/278ef2cd96208b89689a4963e69713dcb6fa19eb), [`bae4118`](https://github.com/rtCamp/snapwp/commit/bae41180f8012b0232f0c87a3c9e470d56603ff2), [`9ddaf7c`](https://github.com/rtCamp/snapwp/commit/9ddaf7c89a243370afb06894e4ed9d5bde2d5e45), [`c460b31`](https://github.com/rtCamp/snapwp/commit/c460b31679ea6c1817b8a340cb180c180c17a362)]:
    -   @snapwp/core@0.3.1

## 0.3.0

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

-   [#55](https://github.com/rtCamp/snapwp/pull/55) [`603bd86`](https://github.com/rtCamp/snapwp/commit/603bd869f9f5c36d373c73f67fb2d2991e0de11d) Thanks [@Ta5r](https://github.com/Ta5r)! - tests: Add tests for QueryEngine and utils

### Patch Changes

-   [#119](https://github.com/rtCamp/snapwp/pull/119) [`f5ef79a`](https://github.com/rtCamp/snapwp/commit/f5ef79a83f3f13fead3ee3075a32c4f7533ff525) Thanks [@SH4LIN](https://github.com/SH4LIN)! - feat: load default favicon metadata from WordPress

-   [#115](https://github.com/rtCamp/snapwp/pull/115) [`347216c`](https://github.com/rtCamp/snapwp/commit/347216c21bb0af80c644fc9fe47bbf589eb80fc8) Thanks [@Pathan-Amaankhan](https://github.com/Pathan-Amaankhan)! - chore: Add and enforce explicit return types on method signatures.

-   [#120](https://github.com/rtCamp/snapwp/pull/120) [`0a4d1e0`](https://github.com/rtCamp/snapwp/commit/0a4d1e0fba4666b6dea351098df10620ed379662) Thanks [@Ta5r](https://github.com/Ta5r)! - dev: Use `area` attribute as HTML tag fallback in `CoreTemplatePart` block component.

-   [#90](https://github.com/rtCamp/snapwp/pull/90) [`c956f31`](https://github.com/rtCamp/snapwp/commit/c956f31f3d70361f125db2373f57779df6963e45) Thanks [@BhumikP](https://github.com/BhumikP)! - refactor: Enforce `exactOptionalPropertyType` TypeScript rule

-   Updated dependencies [[`57f3c09`](https://github.com/rtCamp/snapwp/commit/57f3c098ba238acb89c43ea52c588e09094ae7d5), [`347216c`](https://github.com/rtCamp/snapwp/commit/347216c21bb0af80c644fc9fe47bbf589eb80fc8), [`57f3c09`](https://github.com/rtCamp/snapwp/commit/57f3c098ba238acb89c43ea52c588e09094ae7d5), [`c956f31`](https://github.com/rtCamp/snapwp/commit/c956f31f3d70361f125db2373f57779df6963e45)]:
    -   @snapwp/core@0.3.0

## 0.2.0

### Minor Changes

-   [#103](https://github.com/rtCamp/snapwp/pull/103) [`579ba54`](https://github.com/rtCamp/snapwp/commit/579ba54e72d78b8b5fae89c8ddcd6bbdc0487f91) Thanks [@ashutoshgautams](https://github.com/ashutoshgautams)! - refactor!: Change `location` to `groupLocation` for script placement enum type

### Patch Changes

-   [#87](https://github.com/rtCamp/snapwp/pull/87) [`71bd814`](https://github.com/rtCamp/snapwp/commit/71bd81452935736170e81dabe8fea48b6d2b8085) Thanks [@BhumikP](https://github.com/BhumikP)! - dev: Implement noPropertyAccessFromIndexSignature rule in tsconfig base

-   Updated dependencies [[`dcecabf`](https://github.com/rtCamp/snapwp/commit/dcecabfa9df535727e988d2db59bb0a6aa5d2a73), [`71bd814`](https://github.com/rtCamp/snapwp/commit/71bd81452935736170e81dabe8fea48b6d2b8085), [`579ba54`](https://github.com/rtCamp/snapwp/commit/579ba54e72d78b8b5fae89c8ddcd6bbdc0487f91)]:
    -   @snapwp/core@0.2.0

## 0.1.0

### Minor Changes

-   [#81](https://github.com/rtCamp/snapwp/pull/81) [`2595e37`](https://github.com/rtCamp/snapwp/commit/2595e376efb9a24b9caa0be9146976ec1386ffc4) Thanks [@justlevine](https://github.com/justlevine)! - chore: SemVer bump to 0.1.0

### Patch Changes

-   [#77](https://github.com/rtCamp/snapwp/pull/77) [`a3c3f6b`](https://github.com/rtCamp/snapwp/commit/a3c3f6b27994b1c5fee555e23c4ea40f7b88667a) Thanks [@SH4LIN](https://github.com/SH4LIN)! - feat: Improve handling of GraphQL errors and the Error Boundary UI.

-   [#52](https://github.com/rtCamp/snapwp/pull/52) [`47cad60`](https://github.com/rtCamp/snapwp/commit/47cad6075621da9946a29feba62fc33fe59fdaf6) Thanks [@Swanand01](https://github.com/Swanand01)! - feat: Add better type definitions for block props

-   Updated dependencies [[`47cad60`](https://github.com/rtCamp/snapwp/commit/47cad6075621da9946a29feba62fc33fe59fdaf6), [`2595e37`](https://github.com/rtCamp/snapwp/commit/2595e376efb9a24b9caa0be9146976ec1386ffc4)]:
    -   @snapwp/core@0.1.0

## 0.0.3

### Patch Changes

-   docs: Update, backfill, and cleanup readmes
-   chore: use explicit `type` import syntax

-   Updated dependencies [[`f655e18`](https://github.com/rtCamp/snapwp/commit/f655e18f08f0f1c2402f8a79eb618096346dead5), [`f19903d`](https://github.com/rtCamp/snapwp/commit/f19903d33b61a7fe15c16bbe949aebb5c26f1081), [`f19903d`](https://github.com/rtCamp/snapwp/commit/f19903d33b61a7fe15c16bbe949aebb5c26f1081), [`55bd683`](https://github.com/rtCamp/snapwp/commit/55bd683e11c556bb78140299554cf845ba34903c), [`f19903d`](https://github.com/rtCamp/snapwp/commit/f19903d33b61a7fe15c16bbe949aebb5c26f1081), [`f19903d`](https://github.com/rtCamp/snapwp/commit/f19903d33b61a7fe15c16bbe949aebb5c26f1081), [`f19903d`](https://github.com/rtCamp/snapwp/commit/f19903d33b61a7fe15c16bbe949aebb5c26f1081)]:
    -   @snapwp/core@0.0.2

## 0.0.2 - 2025-02-07

-   fix: Normalize file paths when detecting the `snapwp.config.mjs` file on Windows.

## 0.0.1 - 2025-01-30

-   Initial (public) release.
