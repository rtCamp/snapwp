import getClassNamesFromString from '../get-class-names-from-string';

describe( 'getClassNamesFromString', () => {
	it( 'should return an array of class names from a single class attribute', () => {
		const html = '<div class="class1 class2 class3"></div>';
		const expected = [ 'class1', 'class2', 'class3' ];
		const result = getClassNamesFromString( html );
		expect( result ).toEqual( expected );
	} );

	it( 'should return an empty array if the HTML string does not contain a class attribute', () => {
		const html = '<div></div>';
		const result = getClassNamesFromString( html );
		expect( result ).toEqual( [] );
	} );

	it( 'should return only the first class attribute found in the HTML string', () => {
		const html =
			'<div class="class1 class2"></div><div class="class3 class4"></div>';
		const expected = [ 'class1', 'class2' ];
		const result = getClassNamesFromString( html );
		expect( result ).toEqual( expected );
	} );

	it( 'should return an empty array if the class attribute is empty', () => {
		const html = '<div class=""></div>';
		const result = getClassNamesFromString( html );
		expect( result ).toEqual( [] );
	} );

	it( 'should handle leading and trailing spaces in class names', () => {
		const html = '<div class="  class1   class2  "></div>';
		const expected = [ 'class1', 'class2' ];
		const result = getClassNamesFromString( html );
		expect( result ).toEqual( expected );
	} );

	it( 'should handle no space between class names', () => {
		const html = '<div class="class1class2"></div>';
		const expected = [ 'class1class2' ];
		const result = getClassNamesFromString( html );
		expect( result ).toEqual( expected );
	} );
} );
