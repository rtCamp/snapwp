import type { Metadata } from 'next';

export type Fetcher = () => Promise< unknown >;
export type Parser< TMetadata > = ( data: unknown ) => TMetadata;

export type GetterOptions< TMetadata > = {
	fetcher?: Fetcher;
	parser?: Parser< TMetadata >;
};

export type Getter< TMetadata > = (
	options?: GetterOptions< TMetadata >
) => Promise< Metadata >;
