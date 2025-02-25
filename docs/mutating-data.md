# Mutating GraphQL Query

SnapWP enables the modification and execution of queries through various methods, which can be helpful for retrieving custom data via GraphQL. This document outlines the distinct methods offered by SnapWP for fetching data using GraphQL queries.

## Using @snapwp/query package

@todo: Add example once the function to mutate queries is added to `@snapwp/query` package.

## Using Codegen

@todo: Add example once queries are mutable via codegen.

## Using Apollo Client

To retrieve global styles from the WordPress backend, a GraphQL query can be executed using an Apollo client by:

### 1. Creating a query file

Create a query file in the `src` folder.

```graphql
query GetGlobalStyles {
	globalStyles {
		customCss
		stylesheet
		renderedFontFaces
	}
}
```

### 2. Generate Codegen Documents

Run `npm run codegen` inside the SnapWP application to generate codegen documents.

### 3. Initialize Apollo client

Create a new instance of an Apollo client using `ApolloClient` class available in `@apollo/client` package.

> [!TIP]
> Refer [config-api.md](./config-api.md) for more information on NEXT_PUBLIC_WORDPRESS_URL and NEXT_PUBLIC_GRAPHQL_ENDPOINT.

```typescript
import { ApolloClient } from '@apollo/client';

const apolloClient = new ApolloClient( {
	uri: 'https://{NEXT_PUBLIC_WORDPRESS_URL}/{NEXT_PUBLIC_GRAPHQL_ENDPOINT}', // Specifies the URL of our GraphQL server.
} );
```

### 4. Fetching data

> [!TIP]
> Refer AppoloClient's [official doc](https://www.apollographql.com/docs/react/api/core/ApolloClient#query) for query function definition. For function parameters refer [QueryOptions](https://github.com/apollographql/apollo-client/blob/356fcc9414286988d884e26dffafaf4d317d1b2d/src/core/watchQueryOptions.ts#L56-L86) interface.

Data can be fetched by firing `query` function provided by the Apollo client instance.

```typescript
import { GetGlobalStylesDocument } from './__generated/graphql'; // Import generated codegen query document.

const data = await apolloClient.query( {
	query: GetGlobalStylesDocument,
} );
```
