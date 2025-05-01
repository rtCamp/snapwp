# @snapwp/plugin-apollo-client

**Apollo Client adapter for [SnapWP](../../README.md)**.

This package is a wrapper around the [`@apollo/client` library](https://github.com/apollographql/apollo-client), allowing you to use Apollo Client as the underlying engine for data fetching within the SnapWP ecosystem.

> [!WARNING]
> 🐉 There be dragons!
> This project is in **active development** and considered _experimental_. Some features may be incomplete, unstable, or subject to change.

## Installation

1. Add the package to your SnapWP project's dependencies:

    ```bash
    npm install @snapwp/plugin-apollo-client --save
    ```

    If you wish to use Apollo Client directly, you should also install the core Apollo Client package:

    ```bash
    npm install @snapwp/plugin-apollo-client @apollo/client --save
    ```

2. Update your [snapwp.config.ts file](../../docs/config-api.md) to use the `ApolloClientEngine`:

    ```diff
    import type { SnapWPConfig } from '@snapwp/core/config';
    + import { ApolloClientEngine } from '@snapwp/plugin-apollo-client';

    const config: SnapWPConfig = {
      // The rest of your SnapWP config...
      query: {
    +    engine: ApolloClientEngine,
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
