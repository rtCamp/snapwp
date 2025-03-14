import { TemplateRenderer } from '@snapwp/next';
import { EditorBlocksRenderer } from '@snapwp/blocks';
import { QueryEngine } from '@snapwp/query';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { getConfig } from '@snapwp/core/config';

export async function generateMetadata(): Promise< Metadata | undefined > {
	const headerList = await headers();
	const uri = headerList.get( 'x-current-path' ) || '/';

	if ( uri === '/' ) {
		return undefined;
	}

	const { nextUrl } = getConfig();

	const routeMetadata = await QueryEngine.getRouteMetadata( uri );
	const openGraphMetadata = await QueryEngine.getOpenGraphMetadata( uri );
	const twitterMetadata = await QueryEngine.getTwitterMetadata( uri );

	return {
		title: routeMetadata.title,
		description: routeMetadata.description,
		authors: routeMetadata.authors,
		openGraph: {
			title: openGraphMetadata.title ?? routeMetadata.title,
			url: `${ nextUrl }${ uri }`,
			...( openGraphMetadata.type && { type: openGraphMetadata.type } ),
			images: openGraphMetadata.images,
			publishedTime: openGraphMetadata.publishedTime,
			modifiedTime: openGraphMetadata.modifiedTime,
			description:
				openGraphMetadata.description ?? routeMetadata.description,
		},
		alternates: {
			canonical: `${ nextUrl }${ uri }`,
		},
		twitter: {
			title: twitterMetadata.title ?? routeMetadata.title,
			description:
				twitterMetadata.description ?? routeMetadata.description,
			images: twitterMetadata.image ? [ twitterMetadata.image ] : [],
		},
	};
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
