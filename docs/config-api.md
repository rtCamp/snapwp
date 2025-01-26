# Config API & Environment Variables

This section covers the Config API and `.env` variables used to power SnapWP.

## How It Works

To ensure consistency and allow for composability across the SnapWP framework, we rely on a configuration API shared by all packages, that can be overloaded with environment variables.

### Configuration Resolution

SnapWP resolves configuration using the following hierarchy:

1. **Environment Variables (.env file):** Highest priority.
2. **`snapwp.config.js` or `snapwp.config.mjs` file:** Overrides devault values.
3. **Defaults:** Built-in values to fallback to if no configuration is provided.

The `.env` file takes precedence over `snapwp.config.js`. For instance, if `NEXT_PUBLIC_GRAPHQL_ENDPOINT` is set in both, the `.env` value will override the configuration file.

## Config API

### Environment Variables

SnapWP uses the following `.env` variables to configure your Next.js app. These values are given the highest priority and override the `snapwp.config.js` file.

> [!TIP]
> We recommend copying the `.env` variables from the SnapWP Helper plugin settings screen and pasting them into your `.env` file, then modifying them as needed.

| Variable                                | Required | Default Value         | Description                                                                       | Maps to Config Variable |
| --------------------------------------- | -------- | --------------------- | --------------------------------------------------------------------------------- | ----------------------- |
| `NEXT_PUBLIC_URL`                       | Yes      |                       | The URL of the Next.js site.                                                      | `nextUrl`               |
| `NEXT_PUBLIC_WORDPRESS_URL`             | Yes      |                       | The WordPress frontend domain URL.                                                | `homeUrl`               |
| `NEXT_PUBLIC_GRAPHQL_ENDPOINT`          | No       | `index.php?graphql`   | The relative path to the WordPress GraphQL endpoint.                              | `graphqlEndpoint`       |
| `NEXT_PUBLIC_WORDPRESS_UPLOADS_PATH`    | No       | `/wp-content/uploads` | The relative path to the WordPress uploads directory.                             | `uploadsDirectory`      |
| `NEXT_PUBLIC_WORDPRESS_REST_URL_PREFIX` | No       | `/wp-json`            | The WordPress REST API URL prefix.                                                | `restUrlPrefix`         |
| `INTROSPECTION_TOKEN`                   | Yes      |                       | Token used for authenticating GraphQL introspection queries with GraphQL Codegen. |                         |

Additionally, if you are running a local development environment without a valid SSL certificate, you can set the following environment variable:

```bash
NODE_TLS_REJECT_UNAUTHORIZED=0
```

### Using `snapwp.config.js`

SnapWP allows you to define configurations in a `snapwp.config.js` or `snapwp.config.mjs` file.

For example:

```ts
/** @type {import('@snapwp/core/config').SnapWPConfig} */
const config = {
	graphqlEndpoint: '/graphql',
	uploadsDirectory: '/custom-uploads',
};

export default config;
```

> [!NOTE]
> Place your `snapwp.config.js` or `snapwp.config.mjs` at the root of your application, alongside your `package.json` and `next.config.js` files.

### Integration with `next.config.mjs`

SnapWP extends the Next.js configuration using the `withSnapWP` function to configure certain settings automatically based on your Config API.

```ts
import withSnapWP from '@snapwp/next/withSnapWP';

export default await withSnapWP( {
	// Your Next.js configuration
} );
```

This automatically loads configurations from `.env` and `snapwp.config.js`, making them available for your Next.js application.
