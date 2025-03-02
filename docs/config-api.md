# Config API & Environment Variables

To ensure consistency and enable composability across the SnapWP framework, we use a shared configuration API that unifies two source:

-   The environment variables in the `.env` file.
-   The `snapwp.config.ts` config.

Configurations are used to power behavior behind the scenes, but can also be used directly in your application code with the `getConfig` function.

## `.env` Variables

SnapWP uses the following `.env` variables to configure your Next.js app.

> [!TIP]
> We recommend copying the `.env` variables from the SnapWP Helper plugin settings screen and pasting them into your `.env` file, then modifying them as needed.
> See the [Getting Started](getting-started.md#backend-setup) guide for more information.

| Variable                                | Required | Default Value                            | Description                                                                       | Available via `getConfig() |
|-----------------------------------------| -------- | ---------------------------------------- |-----------------------------------------------------------------------------------|----------------------------|
| `NEXT_PUBLIC_URL`                       | Yes      |                                          | The URL of the Next.js site.                                                      | `nextUrl`                  |
| `NEXT_PUBLIC_WORDPRESS_HOME_URL`        | Yes      |                                          | The WordPress frontend domain URL.                                                | `homeUrl`                  |
| `NEXT_PUBLIC_WORDPRESS_SITE_URL`        | Yes      |                                          | The WordPress site URL.                                                           | `siteUrl`                  |
| `INTROSPECTION_TOKEN`                   | Yes      |                                          | Token used for authenticating GraphQL introspection queries with GraphQL Codegen. | N/A                        |
| `NEXT_PUBLIC_GRAPHQL_ENDPOINT`          | No       | `index.php?graphql`                      | The relative path to the WordPress GraphQL endpoint.                              | `graphqlEndpoint`          |
| `NEXT_PUBLIC_WORDPRESS_UPLOADS_PATH`    | No       | `/wp-content/uploads`                    | The relative path to the WordPress uploads directory.                             | `uploadsDirectory`         |
| `NEXT_PUBLIC_WORDPRESS_REST_URL_PREFIX` | No       | `/wp-json`                               | The WordPress REST API URL prefix.                                                | `restUrlPrefix`            |
| `NEXT_PUBLIC_USE_CORS_PROXY`            | No       | `process.env.NODE_ENV === 'development'` | Whether to use a CORS proxy for the WordPress API.                                | `useCorsProxy`             |
| `NEXT_PUBLIC_CORS_PROXY_PREFIX`         | No       | `/proxy`                                 | The prefix of the CORS proxy.                                                     | `corsProxyPrefix`          |

Additionally, if you are running a local development environment without a valid SSL certificate, you can set the following environment variable:

```bash
NODE_TLS_REJECT_UNAUTHORIZED=0
```

## `snapwp.config.ts` File

SnapWP allows you to define configurations in a `snapwp.config.ts` (or `.mjs` or `.js`) file at the root of your application (alongside your `package.json` and `next.config.ts`).

Example `snapwp.config.ts`:

```ts
``tsx
// snapwp.config.ts

import type { SnapWPConfig } from '@snapwp/core/config';

const config: SnapWPConfig = {
	/* your custom configuration */
};

export default config;
```

Here are the available configuration options:

| Property           | Type                     | Default Value                                                   | Description                                                                                                                                     |
| ------------------ | ------------------------ | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `parserOptions`    | `HTMLReactParserOptions` | [defaultOptions](../packages/next/src/react-parser/options.tsx) | The default options for the `html-react-parser` library.<br />[Learn more](./overloading-wp-behavior.md#2-pass-customparseroptions-to-overload) |
| `blockDefinitions` | `BlockDefinitions`       | [blocks](../packages/blocks/src/blocks/index.ts)                | Block definitions for the editor.<br />[Learn more](./overloading-wp-behavior.md#overloading-blocks)                                            |

Config values are available via their respective keys in the `getConfig()` function.

## Integration with `next.config.ts`

SnapWP extends the Next.js configuration using the `withSnapWP` function to configure certain settings automatically based on your Config API, such as using the WordPress URL for [`images.remotePatterns`](https://nextjs.org/docs/app/api-reference/components/image#remotepatterns).

```ts
import withSnapWP from '@snapwp/next/withSnapWP';

export default await withSnapWP( {
	// Your Next.js configuration
} );
```

This function automatically loads configurations from `.env` and `snapwp.config.js|mjs|ts`, making them available for your Next.js application.

## Accessing config values with `getConfig()`

You can access the configuration values in your application code using the `getConfig` function from `@snapwp/config`.

```ts
import { getConfig } from '@snapwp/core/config';

// Or any other valid configuration property.
const { nextUrl, homeUrl, parserOptions } = getConfig();
```
