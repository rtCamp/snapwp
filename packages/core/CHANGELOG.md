# @snapwp/core

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

-   [#111](https://github.com/rtCamp/snapwp/pull/111) [`57f3c09`](https://github.com/rtCamp/snapwp/commit/57f3c098ba238acb89c43ea52c588e09094ae7d5) Thanks [@SH4LIN](https://github.com/SH4LIN)! - dev!: Reorganize core `utils` into type-based subdirectories.

### Patch Changes

-   [#115](https://github.com/rtCamp/snapwp/pull/115) [`347216c`](https://github.com/rtCamp/snapwp/commit/347216c21bb0af80c644fc9fe47bbf589eb80fc8) Thanks [@Pathan-Amaankhan](https://github.com/Pathan-Amaankhan)! - chore: Add and enforce explicit return types on method signatures.

-   [#90](https://github.com/rtCamp/snapwp/pull/90) [`c956f31`](https://github.com/rtCamp/snapwp/commit/c956f31f3d70361f125db2373f57779df6963e45) Thanks [@BhumikP](https://github.com/BhumikP)! - refactor: Enforce `exactOptionalPropertyType` TypeScript rule

## 0.2.1

### Patch Changes

-   [#108](https://github.com/rtCamp/snapwp/pull/108) [`c1ee556`](https://github.com/rtCamp/snapwp/commit/c1ee5564e1046411dac0ccb5ace99c59fe337959) Thanks [@Pathan-Amaankhan](https://github.com/Pathan-Amaankhan)! - chore: Enforce "import/default" eslint ruleset.

## 0.2.0

### Minor Changes

-   [#103](https://github.com/rtCamp/snapwp/pull/103) [`579ba54`](https://github.com/rtCamp/snapwp/commit/579ba54e72d78b8b5fae89c8ddcd6bbdc0487f91) Thanks [@ashutoshgautams](https://github.com/ashutoshgautams)! - refactor!: Change `location` to `groupLocation` for script placement enum type

### Patch Changes

-   [#42](https://github.com/rtCamp/snapwp/pull/42) [`dcecabf`](https://github.com/rtCamp/snapwp/commit/dcecabfa9df535727e988d2db59bb0a6aa5d2a73) Thanks [@Swanand01](https://github.com/Swanand01)! - feat: Add support for providing block definitions via the Config API.

-   [#87](https://github.com/rtCamp/snapwp/pull/87) [`71bd814`](https://github.com/rtCamp/snapwp/commit/71bd81452935736170e81dabe8fea48b6d2b8085) Thanks [@BhumikP](https://github.com/BhumikP)! - dev: Implement noPropertyAccessFromIndexSignature rule in tsconfig base

## 0.1.0

### Minor Changes

-   [#81](https://github.com/rtCamp/snapwp/pull/81) [`2595e37`](https://github.com/rtCamp/snapwp/commit/2595e376efb9a24b9caa0be9146976ec1386ffc4) Thanks [@justlevine](https://github.com/justlevine)! - chore: SemVer bump to 0.1.0

### Patch Changes

-   [#52](https://github.com/rtCamp/snapwp/pull/52) [`47cad60`](https://github.com/rtCamp/snapwp/commit/47cad6075621da9946a29feba62fc33fe59fdaf6) Thanks [@Swanand01](https://github.com/Swanand01)! - feat: Add better type definitions for block props

## 0.0.2

### Minor Changes

-   [#62](https://github.com/rtCamp/snapwp/pull/62) [`55bd683`](https://github.com/rtCamp/snapwp/commit/55bd683e11c556bb78140299554cf845ba34903c) Thanks [@BhumikP](https://github.com/BhumikP)! - feat: Add support for overloading html-react-parser options

### Patch Changes

-   [#74](https://github.com/rtCamp/snapwp/pull/74) [`f655e18`](https://github.com/rtCamp/snapwp/commit/f655e18f08f0f1c2402f8a79eb618096346dead5) Thanks [@Swanand01](https://github.com/Swanand01)! - fix: Ensure `homeUrl` and `nextUrl` do not have a trailing slash in `SnapWPConfigManager.normalizeConfig`

-   docs: Update, backfill, and cleanup readmes
-   refactor!: Update `getConfig()` to source separate `SnapWPEnv` and `SnapWPConfig`, and add support for `snapwp.config.ts`
-   chore: use explicit `type` import syntax
-   chore: Cleanup tsconfig rulesets and remediate unearthed issues
-   chore: remediate `noUncheckedIndexedAccess` violations
