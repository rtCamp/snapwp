# Query Engine

Instead of locking you down to a specific GraphQL query libray, SnapWP uses a composable **Query Engine** to manage GraphQL queries and client context. It allows you to use your favorite GraphQL client library while providing a consistent API for fetching data.

Users can:

-   Use a **prebuilt Query Engine** (Apollo/TanStack/etc.)
-   **Build and plug-in** their own custom Query Engine following a simple contract.

This allows **maximum flexibility** to choose or change the underlying GraphQL client without modifying your app logic.

## How it works

-   Inside your [snapwp.config.ts](./config-api.md#snapwpconfigts-file), you import and assign your Query Engine class to the `query.engine` property.
-   The Query Engine handles how queries, and client context are managed. It must implement the `QueryEngine` interface provided by `@snapwp/types`.
-   Throughout your app, you can use the `@snapwp/query` package to interact with the Query Engine. This package provides utility functions and hooks for fetching data, managing client context, and using the Query Provider.

### Example (`snapwp.config.ts`)

```typescript
import type { SnapWPConfig } from '@snapwp/core/config';
import { TanStackQueryEngine } from '@snapwp/plugin-tanstack-query';

const config: SnapWPConfig = {
	query: {
		engine: TanStackQueryEngine,
	},
};

export default config;
```

In the above example, `TanStackQueryEngine` is the selected query engine.

## Available Query Engines

SnapWP provides official Query Engines for popular GraphQL clients. You can use these engines out of the box without needing to implement your own.

-   [Apollo Client - `@snapwp/plugin-apollo-client`](../packages/plugin-apollo-client/README.md)
-   [TanStack Query - `@snapwp/plugin-tanstack-query`](../packages/plugin-tanstack-query/README.md)

-   `Apollo Client Engine` from `@snapwp/plugin-apollo-client` _([README](../packages/plugin-apollo-client/README.md))_
-   `TanStack Client Engine` from `@snapwp/plugin-tanstack-query` _([README](../packages/plugin-tanstack-client/README.md))_
-   (Open a PR to submit your own engine!)

## Configuration

You set the Query Engine by specifying it inside `snapwp.config.ts`.

In your `snapwp.config.ts`, you can pass both the engine and options like this:

```typescript
{
	query: {
		engine: CustomQueryEngineClass, // This is your engine (e.g., ApolloClientEngine).
		options: {
			// Custom options to configure the client goes here.
		},
	},
}
```

-   `engine`: A Query Engine class that implements the `QueryEngine` interface.
-   `options`: Any custom configuration that implements `QueryOptions` required by the engine during instantiation.

## Usage

### Using an Available Engine (Example: Apollo Client)

Install and configure the Apollo Query Engine:

```typescript
import type { SnapWPConfig } from '@snapwp/core/config';
import { ApolloClientEngine } from '@snapwp/plugin-apollo-client';

const config: SnapWPConfig = {
	query: {
		engine: ApolloClientEngine,
	},
};

export default config;
```

✅ SnapWP will automatically use Apollo for fetching queries and managing client context.

### Creating a Custom Query Engine

If you want to use a **different GraphQL client**, you can create your own Query Engine.

Your class **must implement** the [`QueryEngine` Interface](..packages/types/src/query-engine/index.ts) from `@snapwp/types`. This interface defines the contract for your Query Engine.

````

#### Method Descriptions:

-   **`getClient()`**
    This method should return an instance of the GraphQL client that is suitable for server-side usage. It will be used to interact with the GraphQL API on the server.

    ```typescript
    getClient(): TClient;
    ```

    **Example use case:** This method ensures that the GraphQL client is available for making requests.

-   **`useClient(client: TClient | undefined): TClient`**
    This method is responsible for setting or retrieving the client instance on the client-side (React). If `client` is provided, the method will store it; if `client` is `undefined`, the method should return the current client instance.

    ```typescript
    useClient(client: TClient | undefined): TClient;
    ```

    **Example use case:** On the client-side, this function helps manage the client instance, allowing you to switch or refresh the client if necessary.

-   **`fetchQuery<TData, TQueryVars>(args: QueryArgs<TData, TQueryVars>): Promise<TData>`**
    This method performs a server-safe data fetch using the GraphQL client. It takes the query arguments (`key`, `query`, and `options`) and returns a promise that resolves with the queried data.

    ```typescript
    fetchQuery<TData, TQueryVars>(args: QueryArgs<TData, TQueryVars>): Promise<TData>;
    ```

    **Example use case:** You would use this to send GraphQL requests on the server side and return the results.

-   **`useQuery<TData, TQueryVars>(args: QueryArgs<TData, TQueryVars>): TData`**
    This method is a React hook that is used for client-side GraphQL queries. It should return the queried data, leveraging the client-side instance for making the request.

    ```typescript
    useQuery<TData, TQueryVars>(args: QueryArgs<TData, TQueryVars>): TData;
    ```

    **Example use case:** On the client-side, you can use this method in your React components to fetch GraphQL data with the provided query and options.

-   **`QueryProvider: ComponentType<PropsWithChildren<{ client: TClient }>>`**
    This is a React component that provides the GraphQL client to the context, allowing any component in the tree to access and use the client. This provider ensures that your GraphQL client is available throughout the React component tree.

    ```typescript
    QueryProvider: ComponentType< PropsWithChildren< { client: TClient } > >;
    ```

    **Example use case:** You would wrap your application (or parts of it) with this `QueryProvider` component to supply the GraphQL client context to child components.

### Example: Building a Custom Query Engine

```typescript
import { QueryEngine, QueryArgs } from '@snapwp/types';
import { GraphQLClient } from 'graphql-request';

class GraphQLRequestEngine implements QueryEngine< GraphQLClient > {
	client: GraphQLClient;

	constructor( options: string ) {
		this.client = new GraphQLClient( options );
	}

	getClient() {
		return this.client;
	}

	useClient( client: GraphQLClient | undefined ) {
		if ( client ) {
			this.client = client;
		}
		return this.client;
	}

	async fetchQuery< TData, TQueryVars >( {
		query,
		options,
	}: QueryArgs< TData, TQueryVars > ): Promise< TData > {
		return this.client.request(
			query.loc?.source.body ?? '',
			options?.variables
		);
	}

	useQuery< TData, TQueryVars >( {
		name,
		query,
		options,
	}: QueryArgs< TData, TQueryVars > ): TData {
		// Implement your client-side fetching here.
	}

	QueryProvider = QueryProvider;
}
````

### Example : Custom QueryProvider.

```tsx
'use client';

import type { JSX, PropsWithChildren } from 'react';

export const QueryProvider: ( {
	client,
	children,
}: PropsWithChildren< {
	client: // Query Client.
} > ) => JSX.Element = ( {
	client,
	children,
}: PropsWithChildren< {
	client: // Query Client.
} > ) => {
	return <QueryProvider client={ client }>{ children }</QueryProvider>;
}
```

Then you can plug it into SnapWP:

(`snapwp.config.ts`)

```typescript
import type { SnapWPConfig } from '@snapwp/core/config';
import { GraphQLRequestEngine } from './GraphQLRequestEngine';

const config: SnapWPConfig = {
	query: {
		engine: GraphQLRequestEngine,
	},
};

export default config;
```

### Using the Query Engine

The `@snapwp/query` package provides a way to interact with the GraphQL query engine. You don’t need to worry about what engine is in use behind the scenes—just use the provided utility functions directly.

-   `fetchQuery<TData, TVars>()`: Perform a server-safe data fetch using the GraphQL client.

-   `getClient<T>()`: Returns a server client instance for the query engine.

-   `useClient<T>(client)`: Returns a client instance for the query engine.

-   `useQuery<TData, TVars>()`: React hook for client-side GraphQL queries.

-   `QueryProvider<T>()`: Provider component to wrap app with query context.

**Example Usage:**

```ts
import {
	fetchQuery,
	useQuery,
	getClient,
	useClient,
	QueryProvider,
} from '@snapwp/query';
```

##### Example: Fetching Data on the Server

```ts
import { fetchQuery } from '@snapwp/query';
import { GetCurrentTemplateDocument } from '@graphqlTypes/graphql';

const data = await fetchQuery( {
	name: 'GetCurrentTemplate',
	query: GetCurrentTemplateDocument,
	options: {
		variables: { uri: '/' },
	},
} );
```

##### Example: Server-Side Client Access

```ts
import { getClient } from '@snapwp/query';

export default async function handler( req, res ) {
	const client = getClient(); // Example: Apollo Client instance
}
```

##### Example: Use `useClient` inside React

```tsx
'use client';

import { useClient } from '@snapwp/query';

// Inside a React component
useClient( /* The client instance to be used */ );
```

##### Example: Using in a React Component

```tsx
import { useQuery } from '@snapwp/query';
import { GetGlobalStylesDocument } from '@graphqlTypes/graphql';

const MyComponent = () => {
	const data = useQuery( {
		name: 'GlobalStyles',
		query: GetGlobalStylesDocument,
	} );
};
```

##### Example: Wrap Your App in a Query Context

```ts
'use client';

import { QueryProvider } from '@snapwp/query';

// Inside a layout or root component
<QueryProvider client={ /* your GraphQL client instance */ }>
  {/* children components go here */}
</QueryProvider>
```

---
