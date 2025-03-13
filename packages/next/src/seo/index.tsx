import { headers } from 'next/headers';
import { QueryEngine } from '@snapwp/query';
import { getConfig } from '@snapwp/core/config';

export type SEOProps = {
	getSeoData?: ( typeof QueryEngine )[ 'getSEOData' ];
};

/**
 * SEO component that renders meta tags based on the provided SEO data.
 *
 * @param props - The props for the SEO component.
 * @param props.getSeoData - An async function to fetch SEO data.
 * @return JSX Element containing meta tags.
 */
export async function SEO( { getSeoData = QueryEngine.getSEOData }: SEOProps ) {
	const headerList = await headers();
	const pathname = headerList.get( 'x-current-path' );
	const { nextUrl } = getConfig();

	const seoData = await getSeoData( pathname || '/' );

	const { siteTitle, pageTitle, description, locale, image, type, author } =
		seoData || {};

	return (
		<>
			<title>{ pageTitle }</title>
			<meta name="og:site_name" content={ siteTitle } />
			{ description && (
				<meta name="description" content={ description } />
			) }
			<meta property="og:title" content={ pageTitle } />
			{ description && (
				<meta property="og:description" content={ description } />
			) }
			<meta property="og:locale" content={ locale || 'en_US' } />
			<meta property="og:url" content={ `${ nextUrl }${ pathname }` } />
			{ image && (
				<>
					<meta property="og:image" content={ image.src } />
					{ image.width && (
						<meta
							property="og:image:width"
							content={ String( image.width ) }
						/>
					) }
					{ image.height && (
						<meta
							property="og:image:height"
							content={ String( image.height ) }
						/>
					) }
				</>
			) }
			{ type && <meta property="og:type" content={ type } /> }
			{ author && <meta name="author" content={ author } /> }
			<link rel="canonical" href={ `${ nextUrl }${ pathname }` } />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={ pageTitle } />
			{ description && (
				<meta name="twitter:description" content={ description } />
			) }
			{ image && <meta name="twitter:image" content={ image.src } /> }
		</>
	);
}
