import type { Metadata } from 'next';

export type MetadataParser< T > = ( data: T ) => Metadata;

export interface MetadataPlugin< TFrag,TData > {
	fragmentDoc: TFrag;
	parser: ( data: TData ) => Metadata;
    type: "root" | "template"
}

