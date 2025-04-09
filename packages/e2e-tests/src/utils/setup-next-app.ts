import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';

import { startProxyRegistry } from './start-proxy-registry';

/**
 * Sets up the Next.js app by creating a test directory, writing environment variables,
 * and running the SnapWP setup.
 */
export async function setupNextApp(): Promise< void > {
	const testAppDir = path.join( process.cwd(), 'test-app' );

	console.log( 'Setting up Next.js app...' );

	try {
		startProxyRegistry();

		await fs.rm( testAppDir, { recursive: true, force: true } );
		await fs.mkdir( testAppDir, { recursive: true } );

		console.log( 'Writing .env file...' );
		const envContent = `
NODE_TLS_REJECT_UNAUTHORIZED="0"
NEXT_PUBLIC_URL="http://localhost:3000"
NEXT_PUBLIC_WORDPRESS_URL="http://localhost:8888"
NEXT_PUBLIC_GRAPHQL_ENDPOINT="graphql"
`;
		await fs.writeFile( path.join( testAppDir, '.env' ), envContent );

		console.log( 'Running SnapWP setup...' );
		await new Promise< void >( ( resolve, reject ) => {
			const snapwpProcess = spawn( 'npx', [ 'snapwp', '--proxy' ], {
				stdio: [ 'pipe', 'inherit', 'inherit' ],
				shell: true,
			} );

			snapwpProcess.stdin.write( 'test-app\n' );
			snapwpProcess.stdin.end();

			snapwpProcess.on( 'exit', ( code ) => {
				if ( code === 0 ) {
					console.log( 'SnapWP setup complete!' );
					resolve();
				} else {
					reject(
						new Error(
							`SnapWP setup failed with exit code: ${ code }`
						)
					);
				}
			} );
		} );
	} catch ( error ) {
		console.error( 'Failed to set up Next.js app:', error );
		throw error;
	}
}
