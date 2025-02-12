# Config API & Environment Variables

This section covers the Config API and `.env` variables used to power SnapWP.

## How It Works

To ensure consistency and enable composability across the SnapWP framework, we rely on a shared configuration API and environment variables.

### Configuration Resolution

SnapWP resolves configuration using the following hierarchy:

There are two types of configurations you can use:

1. Environment variables (`.env` file) - Available at both build time and runtime.
2. Configuration API (`snapwp.config.js|mjs|ts`) - Available only at runtime.

## Config API

### Environment Variables

SnapWP uses the following `.env` variables to configure your Next.js app.

> [!TIP]
> We recommend copying the `.env` variables from the SnapWP Helper plugin settings screen and pasting them into your `.env` file, then modifying them as needed.

| Variable                                | Required | Default Value                            | Description                                                                       | Maps to Config Variable |
| --------------------------------------- | -------- | ---------------------------------------- | --------------------------------------------------------------------------------- | ----------------------- |
| `NEXT_PUBLIC_URL`                       | Yes      |                                          | The URL of the Next.js site.                                                      | `nextUrl`               |
| `NEXT_PUBLIC_WORDPRESS_URL`             | Yes      |                                          | The WordPress frontend domain URL.                                                | `homeUrl`               |
| `INTROSPECTION_TOKEN`                   | Yes      |                                          | Token used for authenticating GraphQL introspection queries with GraphQL Codegen. |                         |
| `NEXT_PUBLIC_GRAPHQL_ENDPOINT`          | No       | `index.php?graphql`                      | The relative path to the WordPress GraphQL endpoint.                              | `graphqlEndpoint`       |
| `NEXT_PUBLIC_WORDPRESS_UPLOADS_PATH`    | No       | `/wp-content/uploads`                    | The relative path to the WordPress uploads directory.                             | `uploadsDirectory`      |
| `NEXT_PUBLIC_WORDPRESS_REST_URL_PREFIX` | No       | `/wp-json`                               | The WordPress REST API URL prefix.                                                | `restUrlPrefix`         |
| `NEXT_PUBLIC_USE_CORS_PROXY`            | No       | `process.env.NODE_ENV === 'development'` | Whether to use a CORS proxy for the WordPress API.                                | `useCorsProxy`          |
| `NEXT_PUBLIC_CORS_PROXY_PREFIX`         | No       | `/proxy`                                 | The prefix of the CORS proxy.                                                     | `corsProxyPrefix`       |

Additionally, if you are running a local development environment without a valid SSL certificate, you can set the following environment variable:

```bash
NODE_TLS_REJECT_UNAUTHORIZED=0
```

### Using `snapwp.config.js|mjs|ts`

SnapWP allows you to define configurations in a `snapwp.config.js`, `snapwp.config.mjs`, or `snapwp.config.ts` file.

For example: @todo: Add example once we specify what can be configured in `snapwp.config.js|mjs|ts`.

> [!NOTE]
> Place your `snapwp.config.js`, `snapwp.config.mjs`, or `snapwp.config.ts` at the root of your application, alongside your `package.json` and `next.config.js` files.

### Integration with `next.config.mjs`

SnapWP extends the Next.js configuration using the `withSnapWP` function to configure certain settings automatically based on your Config API.

```ts
import withSnapWP from '@snapwp/next/withSnapWP';

export default await withSnapWP( {
	// Your Next.js configuration
} );
```

This function automatically loads configurations from `.env` and `snapwp.config.js|mjs|ts`, making them available for your Next.js application.
