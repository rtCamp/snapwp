import {
	getImageSizeFromAttributes,
	type ImageSizeAttributes,
} from '../get-image-size-from-attributes';
import { getPxForSizeAttribute } from '../get-px-for-size-attribute';

jest.mock( '../get-px-for-size-attribute' );

describe( 'getImageSizeFromAttributes', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'should return undefined for width and height if attributes are not provided', () => {
		const attributes: ImageSizeAttributes = {};
		const result = getImageSizeFromAttributes( attributes );
		expect( result ).toEqual( { width: undefined, height: undefined } );
	} );

	it( 'should return the correct width and height based on sizeSlug', () => {
		const attributes: ImageSizeAttributes = { sizeSlug: 'medium' };
		const result = getImageSizeFromAttributes( attributes );
		expect( result ).toEqual( { width: 300, height: 300 } );
	} );

	it( 'should return the correct width based on provided width', () => {
		( getPxForSizeAttribute as jest.Mock ).mockReturnValueOnce( 500 );
		const attributes: ImageSizeAttributes = { width: '500px' };
		const result = getImageSizeFromAttributes( attributes );
		expect( result ).toEqual( { width: 500, height: undefined } );
	} );

	it( 'should return the correct height based on provided height', () => {
		( getPxForSizeAttribute as jest.Mock ).mockReturnValueOnce( 400 );
		const attributes: ImageSizeAttributes = { height: '400px' };
		const result = getImageSizeFromAttributes( attributes );
		expect( result ).toEqual( { width: undefined, height: 400 } );
	} );

	it( 'should return the correct width and height based on provided width and height', () => {
		( getPxForSizeAttribute as jest.Mock )
			.mockReturnValueOnce( 500 )
			.mockReturnValueOnce( 400 );
		const attributes: ImageSizeAttributes = {
			width: '500px',
			height: '400px',
		};
		const result = getImageSizeFromAttributes( attributes );
		expect( result ).toEqual( { width: 500, height: 400 } );
	} );

	it( 'should return the correct width and height based on sizeSlug and provided width and height', () => {
		( getPxForSizeAttribute as jest.Mock )
			.mockReturnValueOnce( 500 )
			.mockReturnValueOnce( 400 );
		const attributes: ImageSizeAttributes = {
			sizeSlug: 'medium',
			width: '500px',
			height: '400px',
		};
		const result = getImageSizeFromAttributes( attributes );
		expect( result ).toEqual( { width: 500, height: 400 } );
	} );

	it( 'should return the correct width and height based on sizeSlug and provided width', () => {
		( getPxForSizeAttribute as jest.Mock ).mockReturnValueOnce( 500 );
		const attributes: ImageSizeAttributes = {
			sizeSlug: 'medium',
			width: '500px',
		};
		const result = getImageSizeFromAttributes( attributes );
		expect( result ).toEqual( { width: 500, height: 300 } );
	} );

	it( 'should return the correct width and height based on sizeSlug and provided height', () => {
		( getPxForSizeAttribute as jest.Mock ).mockReturnValueOnce( 400 );
		const attributes: ImageSizeAttributes = {
			sizeSlug: 'medium',
			height: '400px',
		};
		const result = getImageSizeFromAttributes( attributes );
		expect( result ).toEqual( { width: 300, height: 400 } );
	} );

	it( 'should return undefined for width and height if sizeSlug is not recognized', () => {
		const attributes: ImageSizeAttributes = { sizeSlug: 'unknown' };
		const result = getImageSizeFromAttributes( attributes );
		expect( result ).toEqual( { width: undefined, height: undefined } );
	} );

	it( 'should return undefined for width and height if width and height are empty strings', () => {
		const attributes: ImageSizeAttributes = { width: '', height: '' };
		const result = getImageSizeFromAttributes( attributes );
		expect( result ).toEqual( { width: undefined, height: undefined } );
	} );
} );
