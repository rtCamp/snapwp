/**
 * Waits for a server to respond within a given timeout.
 *
 * @param url - The server URL to check.
 * @param timeout - Max wait time in ms.
 * @return Resolves `true` if the server responds.
 * @throws If the server doesn't respond in time.
 */
export default async function waitForServer( url: string, timeout = 60000 ) {
	const startTime = Date.now();

	while ( Date.now() - startTime < timeout ) {
		try {
			const response = await fetch( url );
			if ( response.ok ) {
				return true;
			}
		} catch ( error ) {
			// Ignore errors and keep trying
		}
		await new Promise( ( resolve ) => setTimeout( resolve, 1000 ) );
	}

	throw new Error(
		`Server at ${ url } did not respond within ${ timeout }ms`
	);
}
