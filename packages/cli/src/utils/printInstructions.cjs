/**
 * Prints the final instructions for the user.
 *
 * @param {string} projectDirPath - Path to the project directory.
 * @param {boolean} useDefaultPath - Whether using default path or not.
 */
const printInstructions = ( projectDirPath, useDefaultPath ) => {
	console.log( '' );
	console.log( `Your project has been scaffolded at: ${ projectDirPath }.` );
	console.log( '' );

	if ( useDefaultPath ) {
		console.log(
			'For setting up environment variables, please refer to the documentation at: https://github.com/rtCamp/snapwp/blob/b7c0472d95be624244ad2a5d01d4bcdaa29e91f3/packages/cli/README.md'
		);
		console.log( '' );
	}

	console.log(
		'To start your headless WordPress project, please run the following commands:'
	);
	console.log( `cd ${ projectDirPath }` );
	console.log( 'npm install' );
	console.log( 'npm run dev' );
};

module.exports = {
	printInstructions,
};
