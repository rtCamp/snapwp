# How to overload QueryEngine

SnapWP uses GraphQL to fetch data from WordPress. To make those GraphQL requests we by default uses Apollo Client in NextJS starter template.
However, you can overload the default QueryEngine to use your own GraphQL client.

To overload the QueryEngine, you need to create a new class that implements the `QueryEngine` interface. `QueryEngine` interface defines the methods that need to be implemented by any query engine.

## Example

This example shows how to overload the `QueryEngine` to use Apollo Client.

index.ts

```ts
import {
  ApolloClient,
  ApolloError,
  InMemoryCache,
  useApolloClient,
  useQuery as useApolloQuery,
  type ApolloClientOptions,
  type NormalizedCacheObject,
  type OperationVariables,
  type QueryOptions,
  type ServerError,
  type ServerParseError,
} from "@apollo/client";
import { Logger } from "@snapwp/core";
import { getGraphqlUrl } from "@snapwp/core/config";
import { QueryProvider } from "./query-provider";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { QueryEngine } from "@snapwp/types";

export type clientType = ApolloClient<NormalizedCacheObject>;
export type clientOptionsType = ApolloClientOptions<NormalizedCacheObject>;

type ApolloQueryArgs<TData, TQueryVars extends Record<string, unknown>> = {
  name: string;
  query: TypedDocumentNode<TData, TQueryVars>;
  options?: QueryOptions<TQueryVars, TData>;
};

export class ApolloClientEngine implements QueryEngine<clientType> {
  private readonly client: ApolloClient<NormalizedCacheObject>;

  /**
   * Creates a new instance of ApolloClientEngine.
   * @param { ApolloClientOptions< NormalizedCacheObject > } options Optional ApolloClientOptions to configure the client instance.
   */
  constructor(options?: ApolloClientOptions<NormalizedCacheObject>) {
    const defaultOptions: ApolloClientOptions<NormalizedCacheObject> = {
      cache: new InMemoryCache(),
      uri: getGraphqlUrl(),
    };
    const mergedOptions = {
      ...defaultOptions,
      ...((options as Partial<ApolloClientOptions<NormalizedCacheObject>>) ||
        {}),
    };

    this.client = new ApolloClient(mergedOptions);
  }

  /**
   * Returns ApolloClient instance.
   *
   * @return A instance of ApolloClient.
   */
  getClient(): ApolloClient<NormalizedCacheObject> {
    return this.client;
  }

  /**
   * Returns an ApolloClient instance from a provided client or undefined.
   * This method is useful when you need to use the ApolloClient hook.
   * @param { ApolloClient< NormalizedCacheObject > } client An optional ApolloClient instance.
   * @return The ApolloClient instance if provided; otherwise, undefined.
   */
  useClient(
    client: ApolloClient<NormalizedCacheObject> | undefined,
  ): ApolloClient<NormalizedCacheObject> {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- This is a hook, so we need to use it in a React component.
    return useApolloClient(
      client || this.client,
    ) as ApolloClient<NormalizedCacheObject>;
  }

  /**
   * Executes a GraphQL query using the Apollo Client instance and writes the result to the cache.
   * @param { Object } props An object containing:
   * @param { string[] } props.key - An array of strings that uniquely identifies the query in the cache.
   * @param { DocumentNode | TypedDocumentNode< TData > } props.query - A GraphQL DocumentNode or TypedDocumentNode representing the query.
   * @param { TQueryOptions } props.options - Optional query options compatible with Apollo's QueryOptions.
   * @return A promise that resolves with the query data of type TData.
   * @throws An error if the query fails, with enhanced error logging for ApolloErrors.
   */
  async fetchQuery<TData, TQueryOptions extends Record<string, unknown>>({
    name,
    query,
    options,
  }: ApolloQueryArgs<TData, TQueryOptions>): Promise<TData> {
    const queryResult = await this.getClient().query<TData>({
      ...options,
      query,
    });
  }

  /**
   * Executes a GraphQL query as a React hook using Apollo's useQuery.
   * @param { Object } props An object containing:
   * @param { string[] } props.key - An array of strings that uniquely identifies the query in the cache.
   * @param { DocumentNode | TypedDocumentNode< TData > } props.query - A GraphQL DocumentNode or TypedDocumentNode representing the query.
   * @param { TQueryOptions } props.options - Optional query options compatible with Apollo's QueryHookOptions.
   * @return The query result data of type TData.
   */
  useQuery<TData, TQueryOptions extends Record<string, unknown>>({
    query,
    options,
  }: ApolloQueryArgs<TData, TQueryOptions>): TData {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- This is a hook, so we need to use it in a React component.
    return useApolloQuery<TData, OperationVariables>(query, options)
      .data as TData;
  }
  QueryProvider = QueryProvider;
}
```

query-provider.tsx

```ts
'use client';

import {
	ApolloProvider,
	type ApolloClient,
	type NormalizedCacheObject,
} from '@apollo/client';
import type { JSX, PropsWithChildren } from 'react';

/**
 * Apollo Query Provider component.
 *
 * @param { Object } props - The root object.
 * @param { ReactNode | undefined } props.children - The child components.
 * @param { ApolloClient< NormalizedCacheObject > } props.client - The Apollo Client instance.
 *
 * @return The rendered ApolloProvider component.
 */
export const QueryProvider: ( {
	client,
	children,
}: PropsWithChildren< {
	client: ApolloClient< NormalizedCacheObject >;
} > ) => JSX.Element = ( {
	client,
	children,
}: PropsWithChildren< {
	client: ApolloClient< NormalizedCacheObject >;
} > ) => {
	return <ApolloProvider client={ client }>{ children }</ApolloProvider>;
};
```

Note: When you create your own QueryEngine, you will have to take care of caching the data and errors. The `QueryEngine` interface does not provide any caching mechanism. You can use Apollo Client's built-in caching or implement your own caching logic.
