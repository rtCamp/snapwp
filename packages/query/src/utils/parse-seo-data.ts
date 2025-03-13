import type { GetSeoDataQuery } from '@graphqlTypes/graphql';
import stripHtml from '@/utils/strip-html';

export type ParsedSeoData = {
	siteTitle: string;
	description?: string;
	locale?: string;
	type?: string;
	pageTitle?: string;
	date?: string;
	modified?: string;
	image?: {
		src: string;
		width?: number;
		height?: number;
	};
	author?: string;
};

/**
 * Parses the SEO data retrieved from a GraphQL query.
 *
 * @param data - The GraphQL query result containing SEO-related data.
 * @return The parsed SEO data or `null` if invalid input.
 */
export default function parseSeoData(
	data: GetSeoDataQuery
): ParsedSeoData | null {
	if ( ! data.generalSettings || ! data.nodeByUri ) {
		return null;
	}

	const { generalSettings, nodeByUri } = data;

	const baseSeoData: ParsedSeoData = {
		siteTitle: generalSettings.title || '',
		description: generalSettings.description || undefined,
		locale: generalSettings.language || undefined,
		type: 'website',
	};

	switch ( nodeByUri.__typename ) {
		case 'Page':
			return {
				...baseSeoData,
				pageTitle: nodeByUri.title || baseSeoData.siteTitle,
				date: nodeByUri.date || undefined,
				modified: nodeByUri.modified || undefined,
				description: nodeByUri.content
					? stripHtml( nodeByUri.content )
					: undefined,
				image: nodeByUri.featuredImage?.node.sourceUrl
					? {
							src: nodeByUri.featuredImage.node.sourceUrl,
							width:
								nodeByUri.featuredImage.node.mediaDetails
									?.width || undefined,
							height:
								nodeByUri.featuredImage.node.mediaDetails
									?.height || undefined,
					  }
					: undefined,
				author: nodeByUri.author?.node.name || undefined,
			};

		case 'Post':
			return {
				...baseSeoData,
				type: 'article',
				pageTitle: nodeByUri.title || baseSeoData.siteTitle,
				date: nodeByUri.date || undefined,
				modified: nodeByUri.modified || undefined,
				description: nodeByUri.excerpt
					? stripHtml( nodeByUri.excerpt )
					: undefined,
				image: nodeByUri.featuredImage?.node.sourceUrl
					? {
							src: nodeByUri.featuredImage.node.sourceUrl,
							width:
								nodeByUri.featuredImage.node.mediaDetails
									?.width || undefined,
							height:
								nodeByUri.featuredImage.node.mediaDetails
									?.height || undefined,
					  }
					: undefined,
				author: nodeByUri.author?.node.name || undefined,
			};

		case 'Category':
		case 'Tag':
		case 'User':
			return {
				...baseSeoData,
				pageTitle: nodeByUri.name || baseSeoData.siteTitle,
				description: nodeByUri.description || undefined,
			};

		default:
			return baseSeoData;
	}
}
