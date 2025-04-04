import type { TypedDocumentNode } from '@snapwp/query';
import type { Metadata } from 'next';

export type TemplateMetadataParser< TMetadata > = (
	data: TMetadata,
	path?: string
) => Metadata;

export interface TemplateMetadataGeneratorPlugin< TData > {
	fragmentDoc: TypedDocumentNode< TData, unknown >;
	parser: ( data: TData ) => Metadata;
}
