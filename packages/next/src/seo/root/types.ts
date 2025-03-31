import type { Metadata } from 'next';

export type Fetcher = () => Promise< unknown >;
export type Validator< TMetadata > = ( data: unknown ) => TMetadata;
export type Parser< TMetadata > = ( data: TMetadata ) => Metadata;

export interface RootMetadataGeneratorPlugin< TData > {
	fetcher: Fetcher;
	defaultFetchedObject?: unknown;
	validator: Validator< TData >;
	defaultValidatedObject?: TData;
	parser: Parser< TData >;
	defaultParsedObject?: Metadata;
}
