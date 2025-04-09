import { clsx, type ClassValue } from 'clsx';

/**
 * Combines class names.
 *
 * @param {Array<ClassValue>} inputs Class names or objects to combine.
 *
 * @return Joined class names.
 *
 * @internal
 */
export function cn( ...inputs: ClassValue[] ): string {
	return clsx( inputs );
}
