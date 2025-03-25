import type { ComponentType } from 'react';

export type BlockDefinitions = {
	/* eslint-disable @typescript-eslint/no-explicit-any -- @todo Need to figure out the type of key & default. */
	[ key: string ]: ComponentType< any > | undefined | null;
	default: ComponentType< any > | undefined | null;
	/* eslint-enable @typescript-eslint/no-explicit-any -- Re-enable ruleset. */
};
