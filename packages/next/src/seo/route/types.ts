import type { Metadata } from 'next';

export type RouteFetcher = ( path: string ) => Promise< unknown >;
export type RouteValidator< TMetadata > =
	| ( ( data: unknown ) => TMetadata )
	| ( ( path: string, data: unknown ) => TMetadata );
export type RouteParser< TMetadata > =
	| ( ( data: TMetadata ) => Metadata )
	| ( ( path: string, data: TMetadata ) => Metadata );

export interface RouteMetadataGeneratorPlugin< TData > {
	fetcher: RouteFetcher;
	defaultFetchedObject?: unknown;
	validator: RouteValidator< TData >;
	defaultValidatedObject?: TData;
	parser: RouteParser< TData >;
	defaultParsedObject?: Metadata;
}
