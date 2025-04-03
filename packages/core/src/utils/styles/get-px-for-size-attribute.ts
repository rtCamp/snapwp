/**
 * Converts a size attribute to pixels.
 *
 * @param {string} sizeAttribute The size attribute string (e.g., "10em", "50%").
 *
 * @return The size in pixels.
 *
 * @internal
 */
export default function getPxForSizeAttribute( sizeAttribute: string ): number {
	const sizeFloat = parseFloat( sizeAttribute );
	const unit = sizeAttribute.replace( sizeFloat.toString(), '' );
	let size;

	switch ( unit ) {
		case 'em':
		case 'rem':
		case '%':
			size = sizeFloat * 16;
			break;
		case 'pt':
			size = sizeFloat * 1.33;
			break;
		case 'pc':
			size = sizeFloat * 16;
			break;
		case 'cm':
			size = sizeFloat * 37.8;
			break;
		case 'mm':
			size = sizeFloat * 3.78;
			break;
		case 'px':
		case '':
		default:
			size = sizeFloat;
			break;
	}

	return size;
}
