# 🫰 SnapWP

A better way to build headless WordPress applications.

## Table of Contents

-   [Overview](#what-is-snapwp)
-   [What's Included?](#whats-included)
-   [Usage](#usage)
-   [Development & Contributing](#local-development--contributing-guidelines)
-   [License](#license)

## What is SnapWP?

[SnapWP](https://snapwp.io) is a composable framework of JavaScript libraries for building headless WordPress applications.

-   🎨 It uses WordPress's [Block Themes](https://wordpress.org/documentation/article/block-themes/) as the default source of truth for both design and content on the frontend.

-   🛠️ It provides an additive and adaptable DX layer / API / tooling that lets developers granularly override just the parts of their app they care about.

SnapWP treats headless WordPress as a progressive enhancement, providing a "turn-key" experience for parity with traditional WordPress sites, so you can focus on building the unique and custom features that make your project stand out.

> [!WARNING]
> 🐉 There be dragons!
> This project is in **active development** and considered _experimental_. Some features may be incomplete, unstable, or subject to change.

## What's Included?

SnapWP provides several plugins, packages, and libraries that can be used individually or together to build better headless WordPress applications.

### JavaScript Libraries (🎯 This monorepo)

#### Core Dependencies

-   [@snapwp/core](packages/core): The "core" functionality and utilities for SnapWP.
-   [@snapwp/next](packages/next): Next.js integration layer for SnapWP.
-   [@snapwp/blocks](packages/blocks): WordPress Block rendering and management system.
-   [@snapwp/query](packages/query): Centralized WPGraphQL query management.
-   [@snapwp/plugin-apollo-client](packages/plugin-apollo-client): Query Engine plugin using Apollo Client for GraphQL operations.
-   [@snapwp/plugin-tanstack-query](packages/plugin-tanstack-query): Query Engine plugin using TanStack Query (React Query) for GraphQL operations.

#### Developer Tooling

-   [@snapwp/codegen-config](packages/codegen-config): Reusable configuration for [GraphQL Codegen](https://the-guild.dev/graphql/codegen).
-   [@snapwp/eslint-config](packages/eslint-config): Reusable ESLint configuration.
-   [@snapwp/prettier-config](packages/jest-preset): Reusable Prettier configuration.

### WordPress Plugins (🔌 External)

-   [SnapWP Helper](https://github.com/rtCamp/snapwp-helper): A WordPress plugin that provides the additional functionality to WordPress and [WPGraphQL](https://www.wpgraphql.com/) needed for SnapWP's frontend libraries.

## Usage

-   [Getting Started](docs/getting-started.md)

### References

-   [Config API & Environment Variables](docs/config-api.md)
-   [Overloading WordPress Behavior](docs/overloading-wp-behavior.md)
-   [NextJS Middleware](docs/middleware.md)
-   [Template Rendering System](docs/template-rendering.md)
-   [Handling HTTP Status Codes](docs/http-status-codes.md)
-   [Resolving CORS Issues](docs/cors.md)

## Development & Contributing

[SnapWP](https://github.com/rtCamp/snapwp) is under active development and maintained by [rtCamp](https://rtcamp.com/).

Contributions are _welcome_ and **encouraged!** To learn more about contributing to SnapWP, please read the [Contributing Guide](/.github/CONTRIBUTING.md).

For development guidelines, please refer to our [Development Guide](./DEVELOPMENT.md).

## License

This project is licensed under the AGPL-3.0 License - see the [LICENSE](LICENSE) file for details.

## BTW, We're Hiring!

<a href="https://rtcamp.com/"><img src="https://rtcamp.com/wp-content/uploads/sites/2/2019/04/github-banner@2x.png" alt="Join us at rtCamp, we specialize in providing high performance enterprise WordPress solutions"></a>
