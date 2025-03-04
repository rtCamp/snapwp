/**
 * Waits for a server to respond within a given number of attempts.
 *
 * @param url - The server URL to check.
 * @param timeout - Max wait time per attempt in ms.
 * @param retries - Number of retry attempts (default: 5).
 * @return Resolves `true` if the server responds.
 * @throws If the server doesn't respond after all retries.
 */
export default async function waitForServer(
	url: string,
	timeout = 10000,
	retries = 5
) {
	let attempts = 0;

	return new Promise< boolean >( ( resolve, reject ) => {
		const interval = setInterval( async () => {
			attempts++;

			try {
				const response = await fetch( url, {
					signal: AbortSignal.timeout( timeout ),
				} );
				if ( response.ok ) {
					clearInterval( interval );
					return resolve( true );
				}
			} catch ( error ) {
				// Ignore errors and retry
			}

			if ( attempts >= retries ) {
				clearInterval( interval );
				return reject(
					new Error(
						`Server at ${ url } did not respond after ${ retries } attempts.`
					)
				);
			}
		}, 1000 );
	} );
}
