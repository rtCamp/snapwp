# @snapwp/plugin-apollo-client

**Apollo Client adapter for [SnapWP](../../README.md)**.

This package is a wrapper around the [`@apollo/client` library](https://github.com/apollographql/apollo-client), providing seamless integration with the SnapWP framework.

SnapWP's query system and configuration API are built to support any GraphQL client that extends its `QueryEngine` interface. This extension makes it easy to use Apollo Client as the underlying engine for data fetching within the SnapWP ecosystem.

> [!WARNING]
> 🐉 There be dragons!
> This project is in **active development** and considered _experimental_. Some features may be incomplete, unstable, or subject to change.

## Installation

To integrate plugin-apollo-client within the SnapWP framework:

```bash
npm install plugin-apollo-client
```

## Using `plugin-apollo-client` in `snapwp.config.ts`

To use `plugin-apollo-client` with SnapWP, we will configure the query engine by adding the `ApolloClientEngine` as the engine to be used for GraphQL operations.

```ts
import type { SnapWPConfig } from '@snapwp/core/config';
import { ApolloClientEngine } from '@snapwp/plugin-apollo-client';

const config: SnapWPConfig = {
	query: {
		engine: ApolloClientEngine,
	},
};

export default config;
```

#### Breakdown of the Setup

1. **Import `ApolloClientEngine`**: Import `ApolloClientEngine` from `plugin-apollo-client`.

2. **Configure `query.engine`**: In the SnapWP config, set `query.engine` to `ApolloClientEngine`. This integrates TanStack Query into the SnapWP framework.

3. **Export the Config**: Export the configuration as default to be used by the SnapWP application.

## Contributing

This package is part of [SnapWP's monorepo](https://github.com/rtCamp/snapwp) and is actively maintained by [rtCamp](https://rtcamp.com/). Packages are published to [npm](https://www.npmjs.com/) from the `packages` directory, and can be used standalone in the headless WordPress ecosystem or as part of SnapWP's framework.

Contributions are _welcome_ and **encouraged!** To learn more about contributing to this package or SnapWP as a whole, please read the [Contributing Guide](../../../.github/CONTRIBUTING.md).

For development guidelines, please refer to our [Development Guide](../../DEVELOPMENT.md).

## Want to expand what's possible with WordPress?

<a href="https://rtcamp.com/"><img src="https://rtcamp.com/wp-content/uploads/sites/2/2019/04/github-banner@2x.png" alt="Join us at rtCamp, we specialize in providing high performance enterprise WordPress solutions."></a>
