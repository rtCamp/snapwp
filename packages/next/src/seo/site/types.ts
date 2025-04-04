import type { TypedDocumentNode } from '@snapwp/query';
import type { Metadata } from 'next';

export type Parser< TMetadata > = ( data: TMetadata ) => Metadata;

export interface RootMetadataGeneratorPlugin< TData > {
	fragmentDoc: TypedDocumentNode< TData, unknown >;
	parser: ( data: TData ) => Metadata;
}
