# Query Engine

SnapWP uses a composable **Query Engine** to manage GraphQL queries and client context. This allows you to use your favorite GraphQL client library while providing a consistent API for fetching data.

Instead of locking you down to a specific GraphQL query library, the Query Engine provides a common interface that can be implemented by different GraphQL clients. This gives you:

-   **Flexibility** to choose your preferred GraphQL client
-   **Consistency** in how you interact with GraphQL data
-   **Interchangeability** to switch implementations without modifying app logic

## Available Query Engines

SnapWP provides official Query Engines for popular GraphQL clients:

-   **Apollo Client**: [`@snapwp/plugin-apollo-client`](../packages/plugin-apollo-client/README.md)
-   **TanStack Query**: [`@snapwp/plugin-tanstack-query`](../packages/plugin-tanstack-query/README.md)

> [!NOTE]
> Want to contribute your own? Open a PR with your implementation!

## Configuration

Define your Query Engine in the `snapwp.config.ts` file:

```typescript
import type { SnapWPConfig } from '@snapwp/core/config';
import { TanStackQueryEngine } from '@snapwp/plugin-tanstack-query';

const config: SnapWPConfig = {
	// Other SnapWP config properties...
	query: {
		engine: TanStackQueryEngine, // The engine you want to use
		options: {
			// Optional: Any client-specific configuration
		},
	},
};

export default config;
```

## Usage

Once configured, you can use the Query Engine through the `@snapwp/query` package, which provides these main APIs:

-   `fetchQuery<TData, TVars>()`: Perform a server-safe data fetch using the GraphQL client.

-   `getClient<T>()`: Returns a server client instance for the query engine.

-   `useClient<T>(client)`: Returns a client instance for the query engine.

-   `useQuery<TData, TVars>()`: React hook for client-side GraphQL queries.

-   `QueryProvider<T>()`: Provider component to wrap app with query context.

```ts
import {
	fetchQuery, // Server-safe data fetching
	useQuery, // React hook for client-side queries
	getClient, // Get server client instance
	useClient, // Get/set client instance (client-side)
	QueryProvider, // Provider component for React context
} from '@snapwp/query';
```

### Example: Server-side Data Fetching

```typescript
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

### Example: Server-Side Client Access

```ts
import { getClient } from '@snapwp/query';

export default async function handler( req, res ) {
	const client = getClient(); // Example: Apollo Client instance
}
```

### Example: React Components

```tsx
import { useQuery } from '@snapwp/query';
import { GetGlobalStylesDocument } from '@graphqlTypes/graphql';

const MyComponent = () => {
	const data = useQuery( {
		name: 'GlobalStyles',
		query: GetGlobalStylesDocument,
	} );

	return <div>{ /* Use data */ }</div>;
};
```

### Example: Use `useClient` inside React

```tsx
'use client';

import { useClient } from '@snapwp/query';

// Inside a React component
useClient( /* The client instance to be used */ );
```

### Example: Client Context

```tsx
'use client';

import { QueryProvider, getClient } from '@snapwp/query';

const client = getClient();

// In your app root
const App = ( { children } ) => (
	<QueryProvider client={ client }>{ children }</QueryProvider>
);
```

## Creating a Custom Query Engine

Want to use a different GraphQL client? You can create a custom Query Engine that implements the `QueryEngine` interface from `@snapwp/types`.

### The QueryEngine Interface

Query Engines must implement this interface from `@snapwp/types`:

```typescript
export interface QueryEngine< TClient > {
	// Returns a GraphQL client for server-side usage
	getClient(): TClient;

	// Sets or retrieves the client instance on the client-side
	useClient( client: TClient | undefined ): TClient;

	// Performs server-safe data fetches with the GraphQL client
	fetchQuery< TData, TQueryVars >(
		args: QueryArgs< TData, TQueryVars >
	): Promise< TData >;

	// React hook for client-side GraphQL queries
	useQuery< TData, TQueryVars >(
		args: QueryArgs< TData, TQueryVars >
	): TData;

	// React component for providing query client context
	QueryProvider: ComponentType< PropsWithChildren< { client: TClient } > >;
}

// Query arguments structure
export interface QueryArgs< TData, TQueryVars > {
	name: string;
	query: TypedDocumentNode< TData, TQueryVars >;
	options?: {
		variables?: TQueryVars;
	};
}
```

### Implementation Example

Here's a simplified implementation using `graphql-request`:

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
}
```

### Example : Custom QueryProvider.

```tsx
'use client';

import type { JSX, PropsWithChildren } from 'react';

export const QueryProvider = ( {
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

Then configure it in your `snapwp.config.ts`:

```typescript
import type { SnapWPConfig } from '@snapwp/core/config';
import { GraphQLRequestEngine } from './my-engines/GraphQLRequestEngine';

const config: SnapWPConfig = {
	query: {
		engine: GraphQLRequestEngine,
	},
};

export default config;
```
