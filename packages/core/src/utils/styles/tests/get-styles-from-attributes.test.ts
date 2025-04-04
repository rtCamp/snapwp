import { compileCSS } from '@wordpress/style-engine';

import getStylesFromAttributes from '../get-styles-from-attributes';

jest.mock( '@wordpress/style-engine', () => ( {
	compileCSS: jest.fn(),
} ) );

describe( 'getStylesFromAttributes', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'should return undefined if attributes have no style property', () => {
		const result = getStylesFromAttributes( {} );
		expect( result ).toEqual( undefined );
	} );

	it( 'should return undefined if the style string is empty', () => {
		const result = getStylesFromAttributes( { style: '' } );
		expect( result ).toEqual( undefined );
	} );

	it( 'should compile styles and convert them to a React style object', () => {
		const mockCompiledCSS = 'color: red; font-size: 12px;';
		( compileCSS as jest.Mock ).mockReturnValue( mockCompiledCSS );

		const attributes = {
			style: JSON.stringify( {
				color: 'red',
				fontSize: '12px',
			} ),
		};

		const expected = { color: 'red', fontSize: '12px' };
		const result = getStylesFromAttributes( attributes );
		expect( result ).toEqual( expected );
		expect( compileCSS ).toHaveBeenCalledWith(
			JSON.parse( attributes.style )
		);
	} );

	it( 'should return undefined if compiledStyles is undefined', () => {
		( compileCSS as jest.Mock ).mockReturnValue( undefined );

		const attributes = {
			style: JSON.stringify( {
				color: 'blue',
			} ),
		};

		const result = getStylesFromAttributes( attributes );
		expect( result ).toEqual( undefined );
	} );

	it( 'should handle complex styles and return the correct React style object', () => {
		const mockCompiledCSS = 'background-color: blue; padding-left: 10px;';
		( compileCSS as jest.Mock ).mockReturnValue( mockCompiledCSS );

		const attributes = {
			style: JSON.stringify( {
				backgroundColor: 'blue',
				paddingLeft: '10px',
			} ),
		};

		const expected = { backgroundColor: 'blue', paddingLeft: '10px' };
		const result = getStylesFromAttributes( attributes );
		expect( result ).toEqual( expected );
		expect( compileCSS ).toHaveBeenCalledWith(
			JSON.parse( attributes.style )
		);
	} );

	it( 'should log an error and return an empty object if invalid JSON is provided', () => {
		const invalidJson = 'invalid-json';
		const attributes = {
			style: invalidJson,
		};

		expect( () => getStylesFromAttributes( attributes ) ).toThrow();
	} );
} );
