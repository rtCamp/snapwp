# NextJS Starter

## Linting and formatting

-   `npm run lint` verifies linting and formatting rules.

## Testing

-   `npm run test` Runs unit tests configured with jest.
-   `npm run test:watch` Runs unit tests configured with jest in watch mode.

## Building

-   `npm run build` Builds the production Next app. This command is usually followed by `npm run start` which starts a server to server the next app.
-   `npm run dev` Builds the next app in development mode and watches for changes in source files for rebuilding.

## Codegen

-   `npm run codegen` Generates GraphQL related types for integration into TS.
-   `npm run codegen:watch` Generates GraphQL related types for integration into TS in watch mode.
-   `npm run prebuild` Codegen is also configured as a prebuild step since generated types are required for building the next app.
