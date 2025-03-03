/**
 * Parses given string into remote patterns.
 * @param str URLs for external image sources in a comma seperated fashion.
 *
 * @return {Array<Object>} an array of remote patterns to be used in next.config.js
 *
 * @internal
 */
export default function parseExternalRemotePatterns( str?: string ) {
	if ( ! str ) {
		return [
			{
				protocol: 'https',
				hostname: '**',
			},
		];
	}
	return str
		.split( ',' )
		.map( ( urlString ) => {
			// wrapped URL() in the try-catch block so one invalid URL doesn't stop parsing of other URLs.
			try {
				const url = new URL( urlString );

				return {
					protocol: url.protocol.replace( ':', '' ),
					hostname: url.hostname,
					port: url.port,
					pathname:
						url.pathname + ( url.pathname === '/' ? '**' : '/**' ),
				};
			} catch ( e ) {
				return null;
			}
		} )
		.filter( ( pattern ) => !! pattern );
}
