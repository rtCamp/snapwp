import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getConfig } from '@snapwp/core/config';

/**
 * Proxies a request to WordPress API.
 *
 * @param request The incoming request.
 * @param root0 The parameters for the request.
 * @param root0.params The parameters for the request.
 * @param root0.params.path The path to the external API.
 *
 * @return The response from the external API.
 */
export async function GET(
	request: NextRequest,
	{ params }: { params: { path: string[] } }
) {
	const { path } = params;

	const { homeUrl } = getConfig();
	// Construct the target URL
	const targetUrl = new URL( path.join( '/' ), homeUrl ).toString();

	try {
		// Forward the request to the external API
		const response = await fetch( targetUrl, {
			headers: {
				'Content-Type': 'application/javascript', // Ensure the correct MIME type
			},
		} );

		// Check if the response is OK
		if ( ! response.ok ) {
			throw new Error(
				`Error from external API: ${ response.statusText }`
			);
		}

		// Get the response data
		const data = await response.text();

		// Return the response with the correct Content-Type header
		return new NextResponse( data, {
			headers: {
				'Content-Type': 'application/javascript',
			},
		} );
	} catch ( error ) {
		// eslint-disable-next-line no-console
		console.error( 'Proxy error:', error );
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
