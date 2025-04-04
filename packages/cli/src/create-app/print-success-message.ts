/**
 * Prints the final instructions for the user.
 *
 * @param {string} projectDirPath - Path to the project directory.
 * @param {boolean} useDefaultEnv - Whether using default env or not.
 * @param {boolean} needsManualInstall - Whether the user needs to run npm install manually.
 */
export default function printSuccessMessage(
	projectDirPath: string,
	useDefaultEnv: boolean,
	needsManualInstall: boolean = false
): void {
	console.log( '' );
	console.log( `Your project has been scaffolded at: ${ projectDirPath }.` );
	console.log( '' );

	if ( useDefaultEnv ) {
		console.log(
			'For setting up environment variables, please refer to the documentation at: https://github.com/rtCamp/snapwp/blob/b7c0472d95be624244ad2a5d01d4bcdaa29e91f3/packages/cli/README.md'
		);
		console.log( '' );
	}

	console.log(
		'To start your headless WordPress project, please run the following commands:'
	);
	console.log( `cd ${ projectDirPath }` );

	if ( needsManualInstall ) {
		console.log( 'npm install' );
	}

	console.log( 'npm run dev' );
}
