type ScriptModuleDependencyProps = {
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
	groupLocation?: 'HEADER' | 'FOOTER' | null;
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
