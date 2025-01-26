import getColorClassName from '@/utils/get-color-class-name';

describe( 'getColorClassName', () => {
	it( 'returns the correct class name for valid color context and slug', () => {
		const result = getColorClassName( 'background', 'primary' );
		expect( result ).toBe( 'has-primary-background' );
	} );

	it( 'returns undefined when colorContextName is missing', () => {
		const result = getColorClassName( undefined, 'primary' );
		expect( result ).toBeUndefined();
	} );

	it( 'returns undefined when colorSlug is missing', () => {
		const result = getColorClassName( 'background', undefined );
		expect( result ).toBeUndefined();
	} );

	it( 'returns undefined when both colorContextName and colorSlug are missing', () => {
		const result = getColorClassName( undefined, undefined );
		expect( result ).toBeUndefined();
	} );

	it( 'returns the correct class name for different valid color context and slug', () => {
		const result = getColorClassName( 'text', 'secondary' );
		expect( result ).toBe( 'has-secondary-text' );
	} );
} );
