export type OptionalUndefinedType< T > = {
	[ P in keyof T ]?: T[ P ] | undefined;
};
