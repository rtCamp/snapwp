const path = require( 'path' );
const fs = require( 'fs/promises' );

( async () => {
	try {
		await fs.access( './dist' );
		await fs.rm( './dist', { recursive: true, force: true } );
	} catch ( error ) {}
	await fs.mkdir( './dist', { recursive: true } );
	const examplesDir = path.resolve( __dirname, '../../examples' );
	const srcDir = path.resolve( __dirname, './src' );

	await fs.cp( examplesDir, path.resolve( __dirname, './dist/examples' ), {
		recursive: true,
		filter: ( source ) =>
			! /.*(node_modules|package-lock\.json|\.env|\.next|next-env\.d\.ts|src\/__generated)/g.test(
				source
			),
	} );
	await fs.cp( srcDir, path.resolve( __dirname, './dist' ), {
		recursive: true,
	} );
} )();
