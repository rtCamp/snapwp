/**
 * A type guard to check if obj has a key
 * @param {unknown} obj Objects to test.
 * @param {string} key Key to be checked in the object
 * @return Flag showing if passed object is an object and has the key.
 */
export function hasKey< K extends string >(
	obj: unknown,
	key: K
): obj is { [ P in K ]: unknown } {
	return typeof obj === 'object' && obj !== null && key in obj;
}
