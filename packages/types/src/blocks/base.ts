export interface BlockData<
	T extends Record< string, unknown > = Record< string, unknown >,
> {
	type: string;
	cssClassNames?: Array< string | null > | null;
	clientId?: string | null;
	parentClientId?: string | null;
	renderedHtml?: string | null;
	attributes?: T;
}

export type BlockProps<
	T extends Record< string, unknown > = Record< string, unknown >,
> = Omit< BlockData< T >, 'type' >;

export type BlockTreeNode< TBlockProps extends BlockData = BlockData > = Omit<
	TBlockProps,
	'parentClientId'
> & {
	children?: BlockTreeNode[] | null;
	renderer: React.FC< React.PropsWithChildren< TBlockProps > >;
};
