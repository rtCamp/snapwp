import type { DocumentNode } from 'graphql/language';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import type { PropsWithChildren } from 'react';

export interface QueryClientAdapter< TClient, TClientOptions = unknown > {
	init( options?: TClientOptions ): TClient;
	getClient( options?: TClientOptions ): TClient;
	getServerClient( options?: TClientOptions ): TClient;
	useClient( client: TClient | undefined ): TClient | undefined;
	fetchQuery< TData >( {
		key,
		query,
		options,
	}: {
		key: string[];
		query: DocumentNode | TypedDocumentNode< TData >;
		// Keeping this unknown because, at this level, we don't know the query options. If we use a generic type, the class implementing this function will add a guardrail for that particular client, but it will cause a type mismatch error.
		options?: unknown;
	} ): Promise< TData >;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Generic type for query options.
	useQuery< TData >( {
		key,
		query,
		options,
	}: {
		key: string[];
		query: DocumentNode | TypedDocumentNode< TData >;
		// Keeping this unknown because, at this level, we don't know the query options. If we use a generic type, the class implementing this function will add a guardrail for that particular client, but it will cause a type mismatch error.
		options?: unknown;
	} ): TData;
	QueryProvider: React.ComponentType<
		PropsWithChildren< { client: TClient } >
	>;
}
