export interface BaseAttributes {
	[ key: string ]: unknown;
}

export interface BaseProps< TAttributes > {
	cssClassNames?: Array< string | null > | null;
	renderedHtml?: string | null;
	attributes?: TAttributes;
}

export type BaseBlock = React.ComponentType< BaseProps< BaseAttributes > >;

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

export type BlockTreeNode< TBlockProps extends BlockData = BlockData > = Omit<
	TBlockProps,
	'parentClientId'
> & {
	children: BlockTreeNode[] | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Renderer should be able to render any React Component.
	renderer: React.ComponentType< any >;
};
