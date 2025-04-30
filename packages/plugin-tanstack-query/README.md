# @snapwp/plugin-tanstack-query

**TanStack Query adapter for [SnapWP](../../README.md)**.

This package is a wrapper around the [TanStack Query](https://github.com/TanStack/query) library, providing seamless integration with the SnapWP framework.

SnapWP’s query system and configuration API are designed to support any GraphQL client that implements its `QueryEngine` interface. This extension allows you to easily use TanStack Query as the underlying engine for data fetching within the SnapWP ecosystem.

> [!WARNING]
> 🐉 There be dragons!
> This project is in **active development** and considered _experimental_. Some features may be incomplete, unstable, or subject to change.

## Installation

To integrate plugin-tanstack-query within the SnapWP framework:

1. **Add the package to your project's dependencies:**

    ```bash
    npm install plugin-tanstack-query --save
    ```

2. **Update your snapwp.config.ts file to use the TanStackQueryEngine instead of the default ApolloClientEngine:**

    ## Using `plugin-tanstack-query` in `snapwp.config.ts`

    To use `plugin-tanstack-query` with SnapWP, we will configure the query engine by replacing the `ApolloClientEngine` _(default)_ with `TanStackQueryEngine`.

    ```diff
    import type { SnapWPConfig } from '@snapwp/core/config';
    - import { ApolloClientEngine } from '@snapwp/plugin-apollo-client';
    + import { TanStackQueryEngine } from '@snapwp/plugin-tanstack-query';

    const config: SnapWPConfig = {
    	query: {
    -		engine: ApolloClientEngine,
    +		engine: TanStackQueryEngine,
    	},
    };

    export default config;
    ```

This setup tells SnapWP to use TanStack Query as its data fetching engine via the TanStackQueryEngine adapter.

#### Breakdown of the Setup

1. **Import `TanStackQueryEngine`**: Instead of ApolloClientEngine _(default)_, import `TanStackQueryEngine` from `plugin-tanstack-query`.

2. **Configure `query.engine`**: In the SnapWP config, set `query.engine` to `TanStackQueryEngine`. This integrates TanStack Query into the SnapWP framework.

3. **Export the Config**: Export the configuration as default to be used by the SnapWP application.

## Contributing

This package is part of [SnapWP's monorepo](https://github.com/rtCamp/snapwp) and is actively maintained by [rtCamp](https://rtcamp.com/). Packages are published to [npm](https://www.npmjs.com/) from the `packages` directory, and can be used standalone in the headless WordPress ecosystem or as part of SnapWP's framework.

Contributions are _welcome_ and **encouraged!** To learn more about contributing to this package or SnapWP as a whole, please read the [Contributing Guide](../../../.github/CONTRIBUTING.md).

For development guidelines, please refer to our [Development Guide](../../DEVELOPMENT.md).

## Want to expand what's possible with WordPress?

<a href="https://rtcamp.com/"><img src="https://rtcamp.com/wp-content/uploads/sites/2/2019/04/github-banner@2x.png" alt="Join us at rtCamp, we specialize in providing high performance enterprise WordPress solutions."></a>
