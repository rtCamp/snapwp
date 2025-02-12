import React from 'react';

export interface BlockData {
	type: string;
	cssClassNames?: Array< string | null > | null;
	clientId?: string | null;
	parentClientId?: string | null;
	renderedHtml?: string | null;
	attributes?: Record< any, any >;
}

export type BlockTreeNode = Omit< BlockData, 'clientId' & 'parentClientId' > & {
	children?: BlockTreeNode[] | null;
	// @todo: implement as generic type once we enforce `no-explicit-any`
	renderer: React.FC< React.PropsWithChildren< any > >;
};

export type BlockDefinitions = {
	[ key: string ]: React.FC< BlockData >;
};

export type EditorBlocksRendererProps = {
	editorBlocks?: BlockData[] | null;
	blockDefinitions?: BlockDefinitions | null;
};

export type TemplateHeadProps = {
	stylesheets?: StyleSheetProps[] | null;
};

export type ScriptModuleDependencyProps = {
	importType?: string | null;
	connectedScriptModule?: {
		handle: string;
		src: string;
	} | null;
};

export type ScriptModuleProps = {
	handle?: string | null;
	src?: string | null;
	extraData?: string | null;
	dependencies?: ScriptModuleDependencyProps[] | null;
};

export type TemplateData = {
	stylesheets?: StyleSheetProps[];
	editorBlocks?: BlockData[];
	scripts?: EnqueuedScriptProps[];
	scriptModules?: ScriptModuleProps[];
	bodyClasses?: string[];
};

export type StyleSheetProps = {
	before?: string | null;
	after?: string | null;
	src?: string | null;
	handle?: string | null;
};

export type EnqueuedScriptProps = {
	after?: ( string | null )[] | null;
	before?: ( string | null )[] | null;
	extraData?: string | null;
	handle?: string | null;
	location?: string | null;
	src?: string | null;
	loadingStrategy?: 'ASYNC' | 'DEFER' | null;
	version?: string | null;
};

export type GlobalHeadProps = {
	customCss?: string | null;
	blockStyles?: string | null;
	globalStylesheet?: string | null;
	renderedFontFaces?: string | null;
};

type DOMNode = {
	type: string;
	name?: string;
	children?: DOMNode[];
	attribs?: Record< string, string >;
	data?: string;
};

export type HTMLReactParserOptions = {
	replace?: ( domNode: DOMNode ) => React.ReactElement | string | null | void;
};
