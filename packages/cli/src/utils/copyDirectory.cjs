const fs = require( 'fs' );
const path = require( 'path' );

// Function to copy directory contents, including handling symbolic links
/**
 *
 * @param src Source path
 * @param dest Destination path
 */
const copyDirectory = ( src, dest ) => {
	if ( ! fs.existsSync( dest ) ) {
		fs.mkdirSync( dest, { recursive: true } );
	}

	const entries = fs.readdirSync( src, { withFileTypes: true } );

	for ( const entry of entries ) {
		const srcPath = path.join( src, entry.name );
		const destPath = path.join( dest, entry.name );

		if ( entry.isDirectory() ) {
			copyDirectory( srcPath, destPath );
		} else if ( entry.isSymbolicLink() ) {
			const symlink = fs.readlinkSync( srcPath );
			fs.symlinkSync( symlink, destPath );
		} else {
			fs.copyFileSync( srcPath, destPath );
		}
	}
};

module.exports = copyDirectory;
