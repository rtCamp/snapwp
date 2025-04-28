# Query Engine

## What it does
SnapWP allows users to decouple the GraphQL client from the core query logic.
Instead of being locked to a specific client like Apollo, users can now:

- Use a **prebuilt Query Engine** (Apollo/TanStack/etc.)
- **Build and plug-in** their own custom Query Engine following a simple contract.

This allows **maximum flexibility** to choose or change the underlying GraphQL client without modifying your app logic.


## How it works
- The `query` expects a **Query Engine class**.
- The Query Engine handles how queries, mutations, and client context are managed.
- It must implement the `QueryEngine` interface provided by `@snapwp/types`.

You can configure the Query Engine inside your `snapwp.config.ts` file.

Example (`snapwp.config.ts`):
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

In the above example, `ApolloClientEngine` is the selected query engine.


## Available Query Engines

- `Apollo Client Engine` from `@snapwp/plugin-apollo-client` _([README](../packages/plugin-apollo-client/README.md))_
- `TanStack Client Engine` from `@snapwp/plugin-tanstack-query` _([README](../packages/plugin-tanstack-client/README.md))_


## Config API
You set the query engine by specifying the **engine class** inside `snapwp.config.ts`.

**Config Structure:**
```typescript
{
	query: {
		engine: YourQueryEngineClass,
	},
}
```

The `engine` should be a class that **implements** the `QueryEngine` interface.

The query configuration not only expects a Query Engine class but can also accept options that are passed during the engine's instantiation.

### Config Structure
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

- `engine`: A Query Engine class that implements the `QueryEngine` interface.
- `options`: Any custom configuration that implements `QueryOptions` required by the engine during instantiation.


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

Your class **must implement** the following interface:
```typescript
interface QueryEngine<TClient> {

	getClient(): TClient;

	useClient(client: TClient | undefined): TClient;

	fetchQuery<TData, TQueryVars>(args: QueryArgs<TData, TQueryVars>): Promise<TData>;

	useQuery<TData, TQueryVars>(args: QueryArgs<TData, TQueryVars>): TData;

	QueryProvider: ComponentType<PropsWithChildren<{ client: TClient }>>;
}
```

#### Method Descriptions:

- **`getClient()`**  
  This method should return an instance of the GraphQL client that is suitable for server-side usage. It will be used to interact with the GraphQL API on the server.

  ```typescript
  getClient(): TClient;
  ```

  **Example use case:** This method ensures that the GraphQL client is available for making requests.

- **`useClient(client: TClient | undefined): TClient`**  
  This method is responsible for setting or retrieving the client instance on the client-side (React). If `client` is provided, the method will store it; if `client` is `undefined`, the method should return the current client instance.

  ```typescript
  useClient(client: TClient | undefined): TClient;
  ```

  **Example use case:** On the client-side, this function helps manage the client instance, allowing you to switch or refresh the client if necessary.

- **`fetchQuery<TData, TQueryVars>(args: QueryArgs<TData, TQueryVars>): Promise<TData>`**  
  This method performs a server-safe data fetch using the GraphQL client. It takes the query arguments (`key`, `query`, and `options`) and returns a promise that resolves with the queried data.

  ```typescript
  fetchQuery<TData, TQueryVars>(args: QueryArgs<TData, TQueryVars>): Promise<TData>;
  ```

  **Example use case:** You would use this to send GraphQL requests on the server side and return the results.

- **`useQuery<TData, TQueryVars>(args: QueryArgs<TData, TQueryVars>): TData`**  
  This method is a React hook that is used for client-side GraphQL queries. It should return the queried data, leveraging the client-side instance for making the request.

  ```typescript
  useQuery<TData, TQueryVars>(args: QueryArgs<TData, TQueryVars>): TData;
  ```

  **Example use case:** On the client-side, you can use this method in your React components to fetch GraphQL data with the provided query and options.

- **`QueryProvider: ComponentType<PropsWithChildren<{ client: TClient }>>`**  
  This is a React component that provides the GraphQL client to the context, allowing any component in the tree to access and use the client. This provider ensures that your GraphQL client is available throughout the React component tree.

  ```typescript
  QueryProvider: ComponentType<PropsWithChildren<{ client: TClient }>>;
  ```

  **Example use case:** You would wrap your application (or parts of it) with this `QueryProvider` component to supply the GraphQL client context to child components.


### Example: Building a Custom Query Engine

```typescript
import { QueryEngine, QueryArgs } from '@snapwp/types';
import { GraphQLClient } from 'graphql-request';

class GraphQLRequestEngine implements QueryEngine<GraphQLClient> {
	client: GraphQLClient;

	constructor(options: string) {
		this.client = new GraphQLClient(options);
	}

	getClient() {
		return this.client;
	}

	useClient(client: GraphQLClient | undefined) {
		if (client) {
			this.client = client;
		}
		return this.client;
	}

	async fetchQuery<TData, TQueryVars>({ query, options }: QueryArgs<TData, TQueryVars>): Promise<TData> {
		return this.client.request(query.loc?.source.body ?? '', options?.variables);
	}

	useQuery<TData, TQueryVars>({ name, query, options }: QueryArgs<TData, TQueryVars>): TData {
		// Implement your client-side fetching here.
	}

	QueryProvider = QueryProvider;
}
```

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

Then you can simply plug it into SnapWP:

(`snapwp.config.ts`)
```typescript
import type { SnapWPConfig } from '@snapwp/core/config';
import { GraphQLRequestEngine } from './your-engines/GraphQLRequestEngine';

const config: SnapWPConfig = {
	query: {
		engine: GraphQLRequestEngine,
	},
};

export default config;
```

---
