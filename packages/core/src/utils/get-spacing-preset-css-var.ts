/**
 * Converts a spacing preset into a custom value.
 *
 * @see https://github.com/WordPress/gutenberg/blob/da50610ac45e2cd18b59424d260bb3d693535061/packages/block-editor/src/components/spacing-sizes-control/utils.js#L128
 *
 * @param value Value to convert.
 *
 * @return  CSS var string for given spacing preset value.
 */
export default function getSpacingPresetCssVar(
	value: string | null | undefined
): string | undefined {
	if ( ! value ) {
		return;
	}

	const slug = value.match( /var:preset\|spacing\|(.+)/ );

	if ( ! slug ) {
		return value;
	}

	return `var(--wp--preset--spacing--${ slug[ 1 ] })`;
}
