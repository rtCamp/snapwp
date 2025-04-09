import { spawn } from 'child_process';
import path from 'path';

import { waitForServer } from './wait-for-server';

/**
 * Starts the Next.js app by installing dependencies, building the project, and running the server.
 */
export async function startNextApp(): Promise< void > {
	console.log( 'Starting Next.js app...' );
	const testAppDir = path.join( process.cwd(), 'test-app' );

	try {
		console.log( 'Installing dependencies...' );
		await new Promise< void >( ( resolve, reject ) => {
			const installProcess = spawn( 'npm', [ 'install' ], {
				cwd: testAppDir,
				stdio: 'inherit',
				shell: true,
			} );

			installProcess.on( 'exit', ( code ) => {
				if ( code === 0 ) {
					console.log( 'Finished installing dependencies.' );
					resolve();
				} else {
					reject(
						new Error(
							`Installing dependencies failed with exit code: ${ code }`
						)
					);
				}
			} );
		} );

		console.log( 'Building Next.js app...' );
		await new Promise< void >( ( resolve, reject ) => {
			const buildProcess = spawn( 'npm', [ 'run', 'build' ], {
				cwd: testAppDir,
				stdio: 'inherit',
				shell: true,
			} );

			buildProcess.on( 'exit', ( code ) => {
				if ( code === 0 ) {
					console.log( 'Build finished.' );
					resolve();
				} else {
					reject(
						new Error( `Build failed with exit code: ${ code }` )
					);
				}
			} );
		} );

		const nextProcess = spawn( 'npm', [ 'start' ], {
			cwd: testAppDir,
			stdio: 'pipe',
			shell: true,
		} );

		nextProcess.stdout?.on( 'data', ( data ) => {
			console.log( '[Next.js]', data.toString() );
		} );

		nextProcess.stderr?.on( 'data', ( data ) => {
			console.error( '[Next.js Error]', data.toString() );
		} );

		await waitForServer( 'http://localhost:3000' );
		console.log( 'Next.js app is ready at http://localhost:3000!' );

		process.env[ 'NEXT_PID' ] = nextProcess?.pid?.toString();
	} catch ( error ) {
		console.error( 'Failed to start Next.js app:', error );
		throw error;
	}
}
