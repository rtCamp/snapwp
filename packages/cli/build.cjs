const path = require( 'path' );
const fs = require( 'fs/promises' );
const copyDirectory = require( './src/utils/copyDirectory.cjs' );

( async () => {
	try {
		await fs.access( './dist' );
		await fs.rm( './dist', { recursive: true, force: true } );
	} catch ( error ) {}
	await fs.mkdir( './dist', { recursive: true } );
	const examplesDir = path.resolve( __dirname, '../../examples' );
	const srcDir = path.resolve( __dirname, './src' );

	copyDirectory( examplesDir, path.resolve( __dirname, './dist/examples' ) );
	copyDirectory( srcDir, path.resolve( __dirname, './dist' ) );
} )();
