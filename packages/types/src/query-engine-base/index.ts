import type { DocumentNode } from 'graphql/language';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';

export interface QueryClientAdapter< TClient > {
	getClient< TClientOptions >( options?: TClientOptions ): TClient;
	getServerClient< TClientOptions >(
		options: TClientOptions | undefined
	): TClient;
	useClient( client: TClient | undefined ): TClient | undefined;
	fetchQuery< TData, TQueryOptions >( {
		key,
		query,
		options,
	}: {
		key: string[];
		query: DocumentNode | TypedDocumentNode< TData >;
		options?: TQueryOptions;
	} ): Promise< TData >;
	useQuery< TData, TQueryOptions >( {
		key,
		query,
		options,
	}: {
		key: string[];
		query: DocumentNode | TypedDocumentNode< TData >;
		options?: TQueryOptions;
	} ): TData;
}
