import getStyleObjectFromString from '../get-style-object-from-string';

describe( 'getStyleObjectFromString', () => {
	it( 'should return undefined for an empty string', () => {
		const result = getStyleObjectFromString( '' );
		expect( result ).toEqual( undefined );
	} );

	it( 'should return the input object if an object is provided', () => {
		const input = { color: 'red', fontSize: '12px' };
		const result = getStyleObjectFromString( input );
		expect( result ).toEqual( input );
	} );

	it( 'should convert a simple CSS string to a React style object', () => {
		const cssString = 'color: red; font-size: 12px;';
		const expected = { color: 'red', fontSize: '12px' };
		const result = getStyleObjectFromString( cssString );
		expect( result ).toEqual( expected );
	} );

	it( 'should handle CSS properties with hyphens by converting them to camel case', () => {
		const cssString = 'background-color: blue; font-size: 14px;';
		const expected = { backgroundColor: 'blue', fontSize: '14px' };
		const result = getStyleObjectFromString( cssString );
		expect( result ).toEqual( expected );
	} );

	it( 'should return undefined if an invalid type is provided', () => {
		const cssString = 123 as unknown as string;
		const result = getStyleObjectFromString( cssString );
		expect( result ).toEqual( undefined );
	} );
} );
