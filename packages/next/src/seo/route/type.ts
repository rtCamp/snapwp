import type { Metadata } from 'next';

export type Fetcher = ( path: string ) => Promise< unknown >;

export type Parser< TMetadata > =
	| ( ( data: unknown ) => TMetadata )
	| ( ( path: string, data: unknown ) => TMetadata );

export type GetterOptions< TMetadata > = {
	fetcher?: Fetcher;
	parser?: Parser< TMetadata >;
};

export type Getter< TMetadata > = (
	path: string,
	options?: GetterOptions< TMetadata >
) => Promise< Metadata >;
