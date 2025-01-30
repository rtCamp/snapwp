# Overview

This is a [Next.js](https://nextjs.org/) application that serves as a headless WordPress frontend using SnapWP.

## Getting Started

#### Install dependencies
  ``` 
  npm install
   ```

#### Run  development server 
```
npm run dev
``` 
Your Next.js app will be available at http://localhost:3000 🎉


## Route Handling

The application uses NextJS's [App router](https://nextjs.org/docs/app/building-your-application/routing) to manage routes.

1. [./src/app/layout.tsx](./src/app/layout.tsx) - The layout component wraps all pages, and handles WordPress's global styles and settings.
2. [./src/app/[[...path]]](./src/app/[[...path]]) - The default WordPress route handler. It renders the WordPress template for the given path.

### Custom Routes

To add a custom route, create a folder with its name, e.g. [./src/app/example-route](./src/app/example-route/page.tsx). The route will be available at `/example-route`, and have access to WordPress global styles and settings.

## Building the App

-   `npm run build` Builds the production Next app. This command is usually followed by `npm run start` which starts a server to server the next app.
-   `npm run dev` Builds the next app in development mode and watches for changes in source files for rebuilding.

## Linting and formatting

-   `npm run lint` verifies linting and formatting rules.
-  `npm run lint:fix`  fixes lintining errors

## Codegen

-   `npm run codegen` Generates GraphQL related types for integration into TS.
-   `npm run codegen:watch` Generates GraphQL related types for integration into TS in watch mode.
-   `npm run prebuild` Codegen is also configured as a prebuild step since generated types are required for building the next app.

## Testing

-   `npm run test` Runs unit tests configured with jest.
-   `npm run test:watch` Runs unit tests configured with jest in watch mode.

## Middlewares

-    Run custom logic before Next.js processes the request. 
-    Checkout [middleware.md](../../../docs/middleware.md) for more

## Learn more

- Visit the [Next.js Documentation](https://nextjs.org/docs)  for more details

## Does this interest you?
<a href="https://rtcamp.com/"><img src="https://rtcamp.com/wp-content/uploads/sites/2/2019/04/github-banner@2x.png" alt="Join us at rtCamp, we specialize in providing high performance enterprise WordPress solutions"></a>
