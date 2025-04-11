import { TemplateRenderer } from '@snapwp/next';
import { getTemplateMetadata } from '@snapwp/next/seo';
import { EditorBlocksRenderer } from '@snapwp/blocks';
import type { Metadata } from 'next';
import { headers } from 'next/headers';

// Generates Metadata for the page.
export async function generateMetadata(): Promise< Metadata | undefined > {
	const headerList = await headers();
	const metadata = await getTemplateMetadata(
		headerList.get( 'x-current-path' )
	);
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
