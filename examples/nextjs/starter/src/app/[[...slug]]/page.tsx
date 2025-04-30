import { TemplateRenderer, getPathsToRenderStatically } from '@snapwp/next';
import { getPageMetadata } from '@snapwp/next/seo';
import { EditorBlocksRenderer } from '@snapwp/blocks';
import type { Metadata } from 'next';

type Props = {
	params: Promise< { slug: string[] } >;
};

// Generates Metadata for the page.
export async function generateMetadata( {
	params,
}: Props ): Promise< Metadata | undefined > {
	const { slug } = await params;

	const path = slug?.join( '/' );
	const metadata = await getPageMetadata( path );

	return metadata;
}

export default function Page( { params }: Props ) {
	return (
		<TemplateRenderer params={ params }>
			{ ( editorBlocks ) => {
				return <EditorBlocksRenderer editorBlocks={ editorBlocks } />;
			} }
		</TemplateRenderer>
	);
}

export const generateStaticParams = async () => {
	return getPathsToRenderStatically();
};

// This is the revalidation time in seconds.
export const revalidate = 300; // 5 minutes
