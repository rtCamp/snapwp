# Static Exports

Static exports enable the generation of static HTML pages for your application, improving performance and SEO. In this section, we’ll walk you through configuring static exports with dynamic routes in a SnapWP-powered application.

SnapWP supports static exports out of the box. Our example application is already pre-configured for static export compatibility.

## Setting Up Static Exports with Dynamic Routes

To enable static exports for dynamic routes, export an asynchronous function named `generateStaticParams` from your dynamic route’s `page.tsx` file. This function should return an array of parameter objects representing each route to be statically generated.

You can use the `getWPStaticPaths` function from the `@snapwp/next` package to fetch route parameters from your WordPress site:

```tsx
// app/[[...uri]]/page.tsx
import { getWPStaticPaths } from "@snapwp/next";

export const generateStaticParams = async () => {
  return getWPStaticPaths();
};
```

If your WordPress site contains a large number of posts, pages, custom post types, users, taxonomies, or terms, you can limit the number of items fetched per request to reduce server load:

```tsx
// app/[[...uri]]/page.tsx
import { getWPStaticPaths } from "@snapwp/next";

export const generateStaticParams = async () => {
  return getWPStaticPaths({ first: 20 });
};
```

Once the URIs are retrieved, Next.js will begin statically generating each corresponding page. This process is parallelized using multiple workers (minimum of 4), which significantly speeds up the build. However, this may increase load on your server.

To better manage server load during static generation, you can configure the following Next.js experimental options in your `next.config.js` file:

```js
// next.config.js
const nextConfig = {
  experimental: {
    // Number of pages processed per worker
    staticGenerationMaxConcurrency: 2,
    // Minimum pages before spawning a new worker
    staticGenerationMinPagesPerWorker: 25,
    // Number of retry attempts for failed page generation
    staticGenerationRetryCount: 1,
    // Number of CPU cores (workers) to use
    cpus: 2,
  },
};

export default nextConfig;
```

> **Note**
> Since SnapWP supports static exports by default, it does not rely on any dynamic Next.js APIs such as `headers()` or `searchParams()`.
> For a full list of unsupported features during static export, refer to the [Next.js documentation](https://nextjs.org/docs/app/guides/static-exports#unsupported-features).
