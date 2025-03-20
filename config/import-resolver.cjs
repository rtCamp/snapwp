/**
 * External dependencies.
 */
const resolverTS = require( 'eslint-import-resolver-typescript' );
const path = require( 'path' );

exports.interfaceVersion = 2;

/**
 * Eslint configuration for resolving TypeScript aliases.
 *
 * @param source Import string.
 * @param file   File-path in which alias is used.
 * @param config configuration.
 *
 * @return Resolved path.
 */
exports.resolve = function ( source, file, config ) {
	/**
	 * Creates a path resolver.
	 *
	 * @param sourcePath Import string.
	 *
	 * @return Path resolver.
	 */
	const resolve = ( sourcePath ) =>
		resolverTS.resolve( sourcePath, file, { ...config } );

	const aliasPaths = {
		'@/': 'src/',
		'@graphqlTypes/': 'src/__generated/',
	};

	const aliases = Object.keys( aliasPaths );

	for ( const alias of aliases ) {
		const resolvedPath = resolvePath(
			source,
			alias,
			aliasPaths[ alias ],
			file,
			resolve
		);

		if ( resolvedPath ) {
			return resolvedPath;
		}
	}

	return resolve( source );
};

/**
 * Resolves TS paths.
 *
 * @param source    Import string.
 * @param alias     Alias to search.
 * @param aliasPath Alias path.
 * @param file      File-path in which alias is used.
 * @param resolve   Path resolver.
 *
 * @return Resolved path on success | False if alias is not found in import string.
 */
function resolvePath( source, alias, aliasPath, file, resolve ) {
	if ( ! source.startsWith( alias ) ) {
		return false;
	}

	const packageName = source.slice( alias.length );

	const slicedAliasPath = aliasPath.slice(
		aliasPath.indexOf( 'src' ) + 'src'.length + 1
	);

	const result = resolve(
		path.join(
			file.slice( 0, file.indexOf( 'src' ) + 'src'.length ),
			slicedAliasPath,
			packageName
		)
	);

	if ( result.found ) {
		return result;
	}

	return resolve(
		path.join(
			file.slice( 0, file.indexOf( 'src' ) + 'src'.length ),
			packageName
		)
	);
}
