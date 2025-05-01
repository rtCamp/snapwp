# @snapwp/plugin-tanstack-query

**TanStack Query adapter for [SnapWP](../../README.md)**.

This package is a wrapper around the [TanStack Query](https://github.com/TanStack/query) library, allowing you to use TanStack Query as the underlying [Query Engine](../../docs/query-engine.md) for data fetching within the SnapWP ecosystem.

> [!WARNING]
> 🐉 There be dragons!
> This project is in **active development** and considered _experimental_. Some features may be incomplete, unstable, or subject to change.

## Installation

1. Add the package to your SnapWP project's dependencies:

    ```bash
    npm install @snapwp/plugin-tanstack-query --save
    ```

    If you wish to use TanStack Query directly, you should also install the core TanStack Query package:

    ```bash
    npm install @snapwp/plugin-tanstack-query @tanstack/react-query --save
    ```

2. Update your [snapwp.config.ts file](../../docs/config-api.md) to use the `TanStackQueryEngine`:

    ```diff
    import type { SnapWPConfig } from '@snapwp/core/config';
    + import { TanStackQueryEngine } from '@snapwp/plugin-tanstack-query';

    const config: SnapWPConfig = {
      // The rest of your SnapWP config...
      query: {
    +    engine: TanStackQueryEngine,
      },
    };

    export default config;
    ```

## Contributing

This package is part of [SnapWP's monorepo](https://github.com/rtCamp/snapwp) and is actively maintained by [rtCamp](https://rtcamp.com/). Packages are published to [npm](https://www.npmjs.com/) from the `packages` directory, and can be used standalone in the headless WordPress ecosystem or as part of SnapWP's framework.

Contributions are _welcome_ and **encouraged!** To learn more about contributing to this package or SnapWP as a whole, please read the [Contributing Guide](../../../.github/CONTRIBUTING.md).

For development guidelines, please refer to our [Development Guide](../../DEVELOPMENT.md).

## Want to expand what's possible with WordPress?

<a href="https://rtcamp.com/"><img src="https://rtcamp.com/wp-content/uploads/sites/2/2019/04/github-banner@2x.png" alt="Join us at rtCamp, we specialize in providing high performance enterprise WordPress solutions."></a>
