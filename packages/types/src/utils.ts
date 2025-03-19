/**
 * A utility type that makes all properties of a given type `T` optional and allows them to be `undefined`.
 *
 * @template T - The type to be transformed.
 */
export type PartialWithUndefined< T > = {
	[ P in keyof T ]?: T[ P ] | undefined;
};
