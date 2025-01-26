import getSpacingPresetCssVar from '../get-spacing-preset-css-var';

describe( 'getSpacingPresetCssVar', () => {
	it( 'should return the corresponding CSS variable for a valid spacing preset', () => {
		const value = 'var:preset|spacing|small';
		const expected = 'var(--wp--preset--spacing--small)';
		const result = getSpacingPresetCssVar( value );
		expect( result ).toBe( expected );
	} );

	it( 'should return the input value if it does not match the expected spacing preset format', () => {
		const value = 'random-value';
		const result = getSpacingPresetCssVar( value );
		expect( result ).toBe( value );
	} );

	it( 'should return undefined if the input value is null', () => {
		const result = getSpacingPresetCssVar( null );
		expect( result ).toBeUndefined();
	} );

	it( 'should return undefined if the input value is undefined', () => {
		const result = getSpacingPresetCssVar( undefined );
		expect( result ).toBeUndefined();
	} );

	it( 'should return undefined if the input value is an empty string', () => {
		const result = getSpacingPresetCssVar( '' );
		expect( result ).toBeUndefined();
	} );

	it( 'should correctly handle spacing presets with complex slugs', () => {
		const value = 'var:preset|spacing|extra-large';
		const expected = 'var(--wp--preset--spacing--extra-large)';
		const result = getSpacingPresetCssVar( value );
		expect( result ).toBe( expected );
	} );
} );
