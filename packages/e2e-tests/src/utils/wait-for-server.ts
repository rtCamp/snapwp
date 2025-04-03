/**
 * Waits for a server to respond within a given number of attempts.
 *
 * @param {string} url     The server URL to check.
 * @param {number} timeout Max wait time per attempt in ms.
 * @param {number} retries Number of retry attempts (default: 5).
 *
 * @throws If the server doesn't respond after all retries.
 */
export default async function waitForServer(
	url: string,
	timeout = 10000,
	retries = 5
): Promise< void > {
	try {
		await fetch( url, {
			method: 'HEAD',
			signal: AbortSignal.timeout( timeout ),
		} );
	} catch ( error ) {
		if ( retries > 0 ) {
			console.log( 'Retrying...' );
			await new Promise( ( resolve ) => setTimeout( resolve, 1000 ) );
			await waitForServer( url, timeout, retries - 1 );
		} else {
			throw error;
		}
	}
}
