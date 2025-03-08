export type BlockDefinitions = {
	/* eslint-disable @typescript-eslint/no-explicit-any -- @todo Need to figure out the type of key & default. */
	[ key: string ]: React.ComponentType< any > | undefined | null;
	default: React.ComponentType< any > | undefined | null;
	/* eslint-enable @typescript-eslint/no-explicit-any -- Re-enable ruleset. */
};
