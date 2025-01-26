import getPxForSizeAttribute from '../get-px-for-size-attribute';

describe( 'getPxForSizeAttribute', () => {
	it( 'should convert em to pixels', () => {
		const result = getPxForSizeAttribute( '10em' );
		expect( result ).toBe( 160 );
	} );

	it( 'should convert rem to pixels', () => {
		const result = getPxForSizeAttribute( '10rem' );
		expect( result ).toBe( 160 );
	} );

	it( 'should convert percentage to pixels', () => {
		const result = getPxForSizeAttribute( '50%' );
		expect( result ).toBe( 800 ); // Assuming 50% of 1600px (default viewport width)
	} );

	it( 'should convert pt to pixels', () => {
		const result = getPxForSizeAttribute( '10pt' );
		expect( result ).toBe( 13.3 );
	} );

	it( 'should convert pc to pixels', () => {
		const result = getPxForSizeAttribute( '10pc' );
		expect( result ).toBe( 160 );
	} );

	it( 'should convert cm to pixels', () => {
		const result = getPxForSizeAttribute( '10cm' );
		expect( result ).toBe( 378 );
	} );

	it( 'should convert mm to pixels', () => {
		const result = getPxForSizeAttribute( '10mm' );
		expect( result ).toBe( 37.8 );
	} );

	it( 'should return the same value for px', () => {
		const result = getPxForSizeAttribute( '10px' );
		expect( result ).toBe( 10 );
	} );

	it( 'should return the same value for no unit', () => {
		const result = getPxForSizeAttribute( '10' );
		expect( result ).toBe( 10 );
	} );

	it( 'should handle invalid unit gracefully', () => {
		const result = getPxForSizeAttribute( '10invalid' );
		expect( result ).toBe( 10 );
	} );

	it( 'should handle empty string gracefully', () => {
		const result = getPxForSizeAttribute( '' );
		expect( result ).toBeNaN();
	} );

	it( 'should handle non-numeric input gracefully', () => {
		const result = getPxForSizeAttribute( 'abc' );
		expect( result ).toBeNaN();
	} );
} );
