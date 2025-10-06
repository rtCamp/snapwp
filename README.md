# 🫰 SnapWP

A better way to build headless WordPress applications.

## Table of Contents

-   [Overview](#what-is-snapwp)
-   [What's Included?](#whats-included)
-   [Usage](#usage)
-   [Local Setup Guide](#local-setup-guide)
-   [Development & Contributing](#development--contributing)
-   [Community & Support](#community--support)
-   [License](#license)

---

## What is SnapWP?

[SnapWP](https://snapwp.io) is a composable framework of JavaScript libraries for building headless WordPress applications.

-   🎨 It uses WordPress's [Block Themes](https://wordpress.org/documentation/article/block-themes/) as the default source of truth for both design and content on the frontend.

-   🛠️ It provides an additive and adaptable DX layer / API / tooling that lets developers granularly override just the parts of their app they care about.

SnapWP treats headless WordPress as a progressive enhancement, providing a "turn-key" experience for parity with traditional WordPress sites, so you can focus on building the unique and custom features that make your project stand out.

> [!WARNING]
> 🐉 There be dragons!
> This project is in **active development** and considered _experimental_. Some features may be incomplete, unstable, or subject to change.

---

## What's Included?

SnapWP provides several plugins, packages, and libraries that can be used individually or together to build better headless WordPress applications.

### JavaScript Libraries (🎯 This monorepo)

#### Core Dependencies

-   [@snapwp/core](packages/core): The "core" functionality and utilities for SnapWP.
-   [@snapwp/next](packages/next): Next.js integration layer for SnapWP.
-   [@snapwp/blocks](packages/blocks): WordPress Block rendering and management system.
-   [@snapwp/query](packages/query): Centralized WPGraphQL query management.
-   [@snapwp/plugin-apollo-client](packages/plugin-apollo-client): Integration with Apollo Client.
-   [@snapwp/plugin-tanstack-query](packages/plugin-tanstack-query): Integration with TanStack Query (React Query).

#### Developer Tooling

-   [@snapwp/codegen-config](packages/codegen-config): Reusable configuration for [GraphQL Codegen](https://the-guild.dev/graphql/codegen).
-   [@snapwp/eslint-config](packages/eslint-config): Reusable ESLint configuration.
-   [@snapwp/prettier-config](packages/prettier-config): Reusable Prettier configuration.

### WordPress Plugins (🔌 External)

-   [SnapWP Helper](https://github.com/rtCamp/snapwp-helper): A WordPress plugin that provides the additional functionality to WordPress and [WPGraphQL](https://www.wpgraphql.com/) needed for SnapWP's frontend libraries.

---

## Usage

-   [Getting Started](docs/getting-started.md)
-   [Config API & Environment Variables](docs/config-api.md)
-   [Resolving CORS Issues](docs/cors.md)

### How-to

-   [Overloading WordPress Behavior](docs/overloading-wp-behavior.md)
-   [Template Rendering System](docs/template-rendering.md)
-   [Using the Query Engine](docs/query-engine.md)
-   [Handling HTTP Status Codes](docs/http-status-codes.md)
-   [Handling Sitemap Generation](docs/sitemap.md)
-   [NextJS Middleware](docs/middleware.md)
-   [Static Exports](docs/static-exports.md)

---

## 🧑‍💻 Local Setup Guide

Follow these steps to run SnapWP locally for development or experimentation:

1. **Fork and clone the repository**
   ```
   git clone https://github.com/<your-username>/snapwp.git
   cd snapwp
3. **Start the development server**
```npm run dev```

This runs the local environment (usually on http://localhost:3000).

3. **Connect to a WordPress backend**

Install and activate the WPGraphQL plugin

Add this line to your .env.local file:
```
NEXT_PUBLIC_WP_API_URL=https://your-site.com/graphql
```

4. **Explore available packages**
Package	Description <br>
@snapwp/core	Core utilities<br>
@snapwp/next	Next.js integration<br>
@snapwp/blocks	WordPress block rendering<br>
@snapwp/query	GraphQL query manager<br>

🧩 **Development & Contributing**
SnapWP is under active development and maintained by rtCamp.

Contributions are welcome and encouraged! 💪
You can:
Add new modules
Improve documentation
Optimize existing components
Fix bugs or issues

To learn more about contributing, please read the Contributing Guide
For development standards, check the Development Guide

💬 **Community & Support**
If you have questions, ideas, or issues:
Check out the Issues section.
Start a discussion or suggest improvements.
Follow rtCamp on GitHub for updates.

🧾 **License**
This project is licensed under the AGPL-3.0 License — see the LICENSE file for details.

💼 BTW, We're Hiring!
<a href="https://rtcamp.com/"> <img src="https://rtcamp.com/wp-content/uploads/sites/2/2019/04/github-banner@2x.png" alt="Join us at rtCamp, we specialize in providing high performance enterprise WordPress solutions"> </a>
