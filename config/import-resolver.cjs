/**
 * External dependencies.
 */
const path = require( 'path' );
const resolverTS = require( 'eslint-import-resolver-typescript' );

exports.interfaceVersion = 2;

/**
 * Eslint configuration for resolving TypeScript aliases.
 *
 * @param {string} source Import string.
 * @param {string} file   File-path in which alias is used.
 * @param {Object} config configuration.
 *
 * @return Resolved path.
 */
exports.resolve = function ( source, file, config ) {
	/**
	 * Creates a path resolver.
	 *
	 * @param {string} sourcePath Import string.
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
 * @param {string} source    Import string.
 * @param {string} alias     Alias to search.
 * @param {string} aliasPath Alias path.
 * @param {string} file      File-path in which alias is used.
 * @param {Function} resolve   Path resolver.
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
