const { exec } = require( 'child_process' );
const fs = require( 'fs/promises' );
const path = require( 'path' );

( async () => {
	const examplesDir = path.resolve( __dirname, '../../examples' );

	console.log( 'Compiling TypeScript...' );
	const child = exec( 'tsc --build --force' );
	child.stdout?.pipe( process.stdout );
	child.stderr?.pipe( process.stderr );

	child.on( 'exit', async ( code ) => {
		if ( code !== 0 ) {
			console.error(
				`TypeScript compilation failed with exit code ${ code }`
			);
			process.exit( code || 1 );
		}

		console.log( 'Copying examples...' );
		await fs.cp(
			examplesDir,
			path.resolve( __dirname, './dist/examples' ),
			{
				recursive: true,
				/**
				 * Filter function to exclude certain files/directories during the copy process
				 *
				 * @param {string} source The source file path to check
				 * @return {boolean} Whether to include the file in the copy operation
				 */
				filter: ( source ) =>
					! /.*(node_modules|package-lock\.json|\.env|\.next|next-env\.d\.ts|src\/__generated)/g.test(
						source
					),
			}
		);

		console.log( 'Build complete!' );
	} );
} )();
