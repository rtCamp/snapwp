import { TemplateRenderer, getRouteMetadata } from '@snapwp/next';
import { EditorBlocksRenderer } from '@snapwp/blocks';
import { Metadata } from 'next';
import { headers } from 'next/headers';

export async function generateMetadata(): Promise< Metadata | undefined > {
	const headerList = await headers();
	const uri = headerList.get( 'x-current-path' ) || '/';

	if ( uri === '/' ) {
		return undefined;
	}

	const metadata = await getRouteMetadata( uri );
	return metadata;
}

export default function Page() {
	return (
		<TemplateRenderer>
			{ ( editorBlocks ) => {
				return <EditorBlocksRenderer editorBlocks={ editorBlocks } />;
			} }
		</TemplateRenderer>
	);
}
