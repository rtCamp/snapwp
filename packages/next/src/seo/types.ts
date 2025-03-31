import type { Metadata } from 'next';

export type Fetcher = () => Promise< unknown >;
export type Validator< TMetadata > = ( data: unknown ) => TMetadata;
export type Parser< TMetadata > = ( data: TMetadata ) => Metadata;

export type RouteFetcher = ( path: string ) => Promise< unknown >;
export type RouteValidator< TMetadata > =
	| ( ( data: unknown ) => TMetadata )
	| ( ( path: string, data: unknown ) => TMetadata );
export type RouteParser< TMetadata > =
	| ( ( data: TMetadata ) => Metadata )
	| ( ( path: string, data: TMetadata ) => Metadata );
