import type { Metadata } from 'next';

export type Fetcher = () => Promise< unknown >;
export type Validator< TMetadata > = ( data: unknown ) => TMetadata;
export type Parser< TMetadata > = ( data: TMetadata ) => Metadata;

export type GetterOptions< TMetadata > = {
	fetcher?: Fetcher;
	parser?: ( data: unknown ) => TMetadata;
};

export type RouteFetcher = ( path: string ) => Promise< unknown >;

export type RouteParser< TMetadata > =
	| ( ( data: unknown ) => TMetadata )
	| ( ( path: string, data: unknown ) => TMetadata );

export type RouteGetterOptions< TMetadata > = {
	fetcher?: Fetcher;
	parser?: RouteParser< TMetadata >;
};

export type RouteGetter< TMetadata > = (
	path: string,
	options?: RouteGetterOptions< TMetadata >
) => Promise< Metadata >;
