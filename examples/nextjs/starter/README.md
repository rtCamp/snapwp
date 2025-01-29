# NextJS Starter

This is a [Next.js](https://nextjs.org/) application that serves as a headless WordPress frontend using SnapWP.

## Getting Started

@todo

## Route Handling

The application uses NextJS's [App router](https://nextjs.org/docs/app/building-your-application/routing) to manage routes.

1. [./src/app/layout.tsx](./src/app/layout.tsx) - The layout component wraps all pages, and handles WordPress's global styles and settings.
2. [./src/app/[[...path]]](./src/app/[[...path]]) - The default WordPress route handler. It renders the WordPress template for the given path.

### Custom Routes

To add a custom route, create a folder with its name, e.g. [./src/app/example-route](./src/app/example-route/page.tsx). The route will be available at `/example-route`, and have access to WordPress global styles and settings.
