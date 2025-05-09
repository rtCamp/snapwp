import { getWPStaticPaths, TemplateRenderer } from '@snapwp/next';
import { getPageMetadata } from '@snapwp/next/seo';
import { EditorBlocksRenderer } from '@snapwp/blocks';
import type { Metadata } from 'next';

type Props = {
	params: Promise< { uri: string[] } >;
};

export default function Page( { params }: Props ) {
	return (
		<TemplateRenderer params={ params }>
			{ ( editorBlocks ) => {
				return <EditorBlocksRenderer editorBlocks={ editorBlocks } />;
			} }
		</TemplateRenderer>
	);
}

// Generates Metadata for the page.
export async function generateMetadata( {
	params,
}: Props ): Promise< Metadata | undefined > {
	const { uri } = await params;

	const path = uri?.join( '/' );
	return await getPageMetadata( path );
}

export const generateStaticParams = async () => {
	return getWPStaticPaths();
};

// Update this to change the revalidation time (in seconds).
export const revalidate = 300; // 5 minutes
