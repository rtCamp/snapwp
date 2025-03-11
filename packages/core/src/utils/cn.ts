import { type ClassValue, clsx } from 'clsx';

/**
 * Combines class names.
 *
 * @param  inputs - Class names or objects to combine.
 *
 * @return {string} Joined class names.
 *
 * @internal
 */
export default function cn( ...inputs: ClassValue[] ): string {
	return clsx( inputs );
}
