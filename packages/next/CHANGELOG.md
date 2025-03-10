# Changelog

## 0.2.0

### Minor Changes

-   [#103](https://github.com/rtCamp/snapwp/pull/103) [`579ba54`](https://github.com/rtCamp/snapwp/commit/579ba54e72d78b8b5fae89c8ddcd6bbdc0487f91) Thanks [@ashutoshgautams](https://github.com/ashutoshgautams)! - refactor!: Change `location` to `groupLocation` for script placement enum type

### Patch Changes

-   [#87](https://github.com/rtCamp/snapwp/pull/87) [`71bd814`](https://github.com/rtCamp/snapwp/commit/71bd81452935736170e81dabe8fea48b6d2b8085) Thanks [@BhumikP](https://github.com/BhumikP)! - dev: Implement noPropertyAccessFromIndexSignature rule in tsconfig base

-   [#95](https://github.com/rtCamp/snapwp/pull/95) [`58d3d47`](https://github.com/rtCamp/snapwp/commit/58d3d4755962456347295dd7d876d02486a8a455) Thanks [@justlevine](https://github.com/justlevine)! - dev: Add compatibility for `ScriptModuleDependency.importType` type change to `ScriptModuleImportTypeEnum`

-   Updated dependencies [[`dcecabf`](https://github.com/rtCamp/snapwp/commit/dcecabfa9df535727e988d2db59bb0a6aa5d2a73), [`71bd814`](https://github.com/rtCamp/snapwp/commit/71bd81452935736170e81dabe8fea48b6d2b8085), [`579ba54`](https://github.com/rtCamp/snapwp/commit/579ba54e72d78b8b5fae89c8ddcd6bbdc0487f91)]:
    -   @snapwp/core@0.2.0
    -   @snapwp/query@0.2.0

## 0.1.0

### Minor Changes

-   [#81](https://github.com/rtCamp/snapwp/pull/81) [`2595e37`](https://github.com/rtCamp/snapwp/commit/2595e376efb9a24b9caa0be9146976ec1386ffc4) Thanks [@justlevine](https://github.com/justlevine)! - chore: SemVer bump to 0.1.0

### Patch Changes

-   [#52](https://github.com/rtCamp/snapwp/pull/52) [`47cad60`](https://github.com/rtCamp/snapwp/commit/47cad6075621da9946a29feba62fc33fe59fdaf6) Thanks [@Swanand01](https://github.com/Swanand01)! - feat: Add better type definitions for block props

-   Updated dependencies [[`a3c3f6b`](https://github.com/rtCamp/snapwp/commit/a3c3f6b27994b1c5fee555e23c4ea40f7b88667a), [`47cad60`](https://github.com/rtCamp/snapwp/commit/47cad6075621da9946a29feba62fc33fe59fdaf6), [`2595e37`](https://github.com/rtCamp/snapwp/commit/2595e376efb9a24b9caa0be9146976ec1386ffc4)]:
    -   @snapwp/query@0.1.0
    -   @snapwp/core@0.1.0

## 0.0.3

### Minor Changes

-   [#62](https://github.com/rtCamp/snapwp/pull/62) [`55bd683`](https://github.com/rtCamp/snapwp/commit/55bd683e11c556bb78140299554cf845ba34903c) Thanks [@BhumikP](https://github.com/BhumikP)! - feat: Add support for overloading html-react-parser options

### Patch Changes

-   docs: Update, backfill, and cleanup readmes
-   refactor!: Update `getConfig()` to source separate `SnapWPEnv` and `SnapWPConfig`, and add support for `snapwp.config.ts`
-   chore: use explicit `type` import syntax
-   chore: Cleanup tsconfig rulesets and remediate unearthed issues
-   chore: remediate `noUncheckedIndexedAccess` violations

-   Updated dependencies [[`f655e18`](https://github.com/rtCamp/snapwp/commit/f655e18f08f0f1c2402f8a79eb618096346dead5), [`f19903d`](https://github.com/rtCamp/snapwp/commit/f19903d33b61a7fe15c16bbe949aebb5c26f1081), [`f19903d`](https://github.com/rtCamp/snapwp/commit/f19903d33b61a7fe15c16bbe949aebb5c26f1081), [`55bd683`](https://github.com/rtCamp/snapwp/commit/55bd683e11c556bb78140299554cf845ba34903c), [`f19903d`](https://github.com/rtCamp/snapwp/commit/f19903d33b61a7fe15c16bbe949aebb5c26f1081), [`f19903d`](https://github.com/rtCamp/snapwp/commit/f19903d33b61a7fe15c16bbe949aebb5c26f1081), [`f19903d`](https://github.com/rtCamp/snapwp/commit/f19903d33b61a7fe15c16bbe949aebb5c26f1081)]:
    -   @snapwp/core@0.0.2
    -   @snapwp/query@0.0.3

## 0.0.2 - 2025-02-07

-   fix: Expose the `className`, `slug`, and `theme` fields to the `CoreTemplatePartFrag.attributes`, to allow for easier component overloading.

## 0.0.1 - 2025-01-30

-   Initial (public) release.
