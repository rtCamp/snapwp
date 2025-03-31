# @snapwp/blocks

## 1.0.0

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

-   [#115](https://github.com/rtCamp/snapwp/pull/115) [`347216c`](https://github.com/rtCamp/snapwp/commit/347216c21bb0af80c644fc9fe47bbf589eb80fc8) Thanks [@Pathan-Amaankhan](https://github.com/Pathan-Amaankhan)! - chore: Add and enforce explicit return types on method signatures.

-   [#120](https://github.com/rtCamp/snapwp/pull/120) [`0a4d1e0`](https://github.com/rtCamp/snapwp/commit/0a4d1e0fba4666b6dea351098df10620ed379662) Thanks [@Ta5r](https://github.com/Ta5r)! - dev: Use `area` attribute as HTML tag fallback in `CoreTemplatePart` block component.

-   [#90](https://github.com/rtCamp/snapwp/pull/90) [`c956f31`](https://github.com/rtCamp/snapwp/commit/c956f31f3d70361f125db2373f57779df6963e45) Thanks [@BhumikP](https://github.com/BhumikP)! - refactor: Enforce `exactOptionalPropertyType` TypeScript rule

-   Updated dependencies [[`a435f08`](https://github.com/rtCamp/snapwp/commit/a435f08b574be81da7f13741587da5405c6eeebd), [`57f3c09`](https://github.com/rtCamp/snapwp/commit/57f3c098ba238acb89c43ea52c588e09094ae7d5), [`f5ef79a`](https://github.com/rtCamp/snapwp/commit/f5ef79a83f3f13fead3ee3075a32c4f7533ff525), [`f88d942`](https://github.com/rtCamp/snapwp/commit/f88d9428b2cd60ce4871c2d62c8bc02bcb00b460), [`347216c`](https://github.com/rtCamp/snapwp/commit/347216c21bb0af80c644fc9fe47bbf589eb80fc8), [`57f3c09`](https://github.com/rtCamp/snapwp/commit/57f3c098ba238acb89c43ea52c588e09094ae7d5), [`c956f31`](https://github.com/rtCamp/snapwp/commit/c956f31f3d70361f125db2373f57779df6963e45)]:
    -   @snapwp/next@1.0.0
    -   @snapwp/core@0.3.0

## 0.1.2

### Patch Changes

-   [#108](https://github.com/rtCamp/snapwp/pull/108) [`c1ee556`](https://github.com/rtCamp/snapwp/commit/c1ee5564e1046411dac0ccb5ace99c59fe337959) Thanks [@Pathan-Amaankhan](https://github.com/Pathan-Amaankhan)! - chore: Enforce "import/default" eslint ruleset.

-   Updated dependencies [[`ade29f3`](https://github.com/rtCamp/snapwp/commit/ade29f32cc3215c25e447c785eb864f081ffce4d), [`d7b87dc`](https://github.com/rtCamp/snapwp/commit/d7b87dc2b2dc0e0221fa074cdd951e39ed44a0ab), [`c1ee556`](https://github.com/rtCamp/snapwp/commit/c1ee5564e1046411dac0ccb5ace99c59fe337959)]:
    -   @snapwp/next@0.2.1
    -   @snapwp/core@0.2.1

## 0.1.1

### Patch Changes

-   [#42](https://github.com/rtCamp/snapwp/pull/42) [`dcecabf`](https://github.com/rtCamp/snapwp/commit/dcecabfa9df535727e988d2db59bb0a6aa5d2a73) Thanks [@Swanand01](https://github.com/Swanand01)! - feat: Add support for providing block definitions via the Config API.

-   [#87](https://github.com/rtCamp/snapwp/pull/87) [`71bd814`](https://github.com/rtCamp/snapwp/commit/71bd81452935736170e81dabe8fea48b6d2b8085) Thanks [@BhumikP](https://github.com/BhumikP)! - dev: Implement noPropertyAccessFromIndexSignature rule in tsconfig base

-   Updated dependencies [[`dcecabf`](https://github.com/rtCamp/snapwp/commit/dcecabfa9df535727e988d2db59bb0a6aa5d2a73), [`71bd814`](https://github.com/rtCamp/snapwp/commit/71bd81452935736170e81dabe8fea48b6d2b8085), [`579ba54`](https://github.com/rtCamp/snapwp/commit/579ba54e72d78b8b5fae89c8ddcd6bbdc0487f91), [`58d3d47`](https://github.com/rtCamp/snapwp/commit/58d3d4755962456347295dd7d876d02486a8a455)]:
    -   @snapwp/core@0.2.0
    -   @snapwp/next@0.2.0

## 0.1.0

### Minor Changes

-   [#81](https://github.com/rtCamp/snapwp/pull/81) [`2595e37`](https://github.com/rtCamp/snapwp/commit/2595e376efb9a24b9caa0be9146976ec1386ffc4) Thanks [@justlevine](https://github.com/justlevine)! - chore: SemVer bump to 0.1.0

### Patch Changes

-   [#52](https://github.com/rtCamp/snapwp/pull/52) [`47cad60`](https://github.com/rtCamp/snapwp/commit/47cad6075621da9946a29feba62fc33fe59fdaf6) Thanks [@Swanand01](https://github.com/Swanand01)! - feat: Add better type definitions for block props

-   Updated dependencies [[`47cad60`](https://github.com/rtCamp/snapwp/commit/47cad6075621da9946a29feba62fc33fe59fdaf6), [`2595e37`](https://github.com/rtCamp/snapwp/commit/2595e376efb9a24b9caa0be9146976ec1386ffc4)]:
    -   @snapwp/core@0.1.0
    -   @snapwp/next@0.1.0

## 0.0.2

### Patch Changes

-   docs: Update, backfill, and cleanup readmes
-   chore: use explicit `type` import syntax
-   chore: Cleanup tsconfig rulesets and remediate unearthed issues
-   chore: remediate `noUncheckedIndexedAccess` violations

-   Updated dependencies [[`f655e18`](https://github.com/rtCamp/snapwp/commit/f655e18f08f0f1c2402f8a79eb618096346dead5), [`f19903d`](https://github.com/rtCamp/snapwp/commit/f19903d33b61a7fe15c16bbe949aebb5c26f1081), [`f19903d`](https://github.com/rtCamp/snapwp/commit/f19903d33b61a7fe15c16bbe949aebb5c26f1081), [`55bd683`](https://github.com/rtCamp/snapwp/commit/55bd683e11c556bb78140299554cf845ba34903c), [`f19903d`](https://github.com/rtCamp/snapwp/commit/f19903d33b61a7fe15c16bbe949aebb5c26f1081), [`f19903d`](https://github.com/rtCamp/snapwp/commit/f19903d33b61a7fe15c16bbe949aebb5c26f1081), [`f19903d`](https://github.com/rtCamp/snapwp/commit/f19903d33b61a7fe15c16bbe949aebb5c26f1081)]:
    -   @snapwp/core@0.0.2
    -   @snapwp/next@0.0.3
