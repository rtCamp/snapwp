# 🫰 SnapWP - Next.js Starter Example

This is a headless WordPress application built with [Next.js](https://nextjs.org/), powered by [WPGraphQL](https://www.wpgraphql.com/) and [SnapWP](https://github.com/rtCamp/snapwp).

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Your Next.js app will be available at http://localhost:3000 🎉

## Commands

`npm run <command>`

-   `build` Builds the production Next app. This command is usually followed by `start` which starts a server to server the next app.
-   `dev` Builds the next app in development mode and watches for changes in the source files and graphql schema.
-   `format` formats the codebase using prettier.
-   `lint` and `lint:fix`: verifies (and fixes, respectively) linting and formatting rules with ESLint.
-   `test` Runs unit tests configured with Jest.
-   `typecheck` runs Typescript type checking.

For more information about developing with SnapWP, please refer to the [SnapWP documentation](https://github.com/rtCamp/snapwp/blob/develop/DEVELOPMENT.md).

## Usage

For detailed instructions on how to use SnapWP, please refer to the [SnapWP documentation](https://github.com/rtCamp/snapwp/blob/develop/docs).

## Features

@todo - Add directory structure and features.

### Route Handling

The application uses NextJS's [App router](https://nextjs.org/docs/app/building-your-application/routing) to manage routes.

1. [./src/app/layout.tsx](./src/app/layout.tsx) - The layout component wraps all pages, and handles WordPress's global styles and settings.
2. [./src/app/[[...path]]](./src/app/[[...path]]) - The default WordPress route handler. It renders the WordPress template for the given path.

### Custom Routes

To add a custom route, create a folder with its name, e.g. [./src/app/example-route](./src/app/example-route/page.tsx). The route will be available at `/example-route`, and have access to WordPress global styles and settings.

### Middleware

-   @see [middleware.md](../../../docs/middleware.md)

## Contributing

This example project is part of [SnapWP's monorepo](https://github.com/rtCamp/snapwp) and is actively maintained by [rtCamp](https://rtcamp.com/). Examples are stored in the `examples` directory, and can be setup locally using the `npx snapwp` command.

Contributions are _welcome_ and **encouraged!** To learn more about contributing to this package or SnapWP as a whole, please read the [Contributing Guide](https://github.com/rtCamp/snapwp/blob/main/.github/CONTRIBUTING.md).

## Want to expand what's possible with WordPress?

<a href="https://rtcamp.com/"><img src="https://rtcamp.com/wp-content/uploads/sites/2/2019/04/github-banner@2x.png" alt="Join us at rtCamp, we specialize in providing high performance enterprise WordPress solutions."></a>
