/**
 *
 * @param target - target object
 * @param source - source object
 * @return Merged object
 */
export default function deepMerge<
	T extends Record< string, unknown >,
	U extends Record< string, unknown >,
>( target: T, source: U ): T & U {
	if ( ! source || typeof source !== 'object' ) {
		return target as T & U;
	}
	if ( ! target || typeof target !== 'object' ) {
		return source as T & U;
	}

	const result = { ...target } as T & U;

	for ( const key in source ) {
		if ( Object.prototype.hasOwnProperty.call( source, key ) ) {
			if (
				typeof source[ key ] === 'object' &&
				source[ key ] !== null &&
				typeof target[ key ] === 'object' &&
				target[ key ] !== null
			) {
				result[ key ] = deepMerge(
					target[ key ] as Record< string, unknown >,
					source[ key ] as Record< string, unknown >
				) as unknown as ( T & U )[ typeof key ];
			} else {
				result[ key ] = source[ key ] as ( T & U )[ typeof key ];
			}
		}
	}

	return result;
}
