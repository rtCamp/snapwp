import { cn } from '../cn';

describe( 'cn', () => {
	it( 'should combine multiple class names into a single string', () => {
		const result = cn( 'class1', 'class2', 'class3' );
		expect( result ).toBe( 'class1 class2 class3' );
	} );

	it( 'should handle conditional class names', () => {
		const result = cn( 'class1', { class2: true, class3: false } );
		expect( result ).toBe( 'class1 class2' );
	} );

	it( 'should handle arrays of class names', () => {
		const result = cn( [ 'class1', 'class2' ], 'class3' );
		expect( result ).toBe( 'class1 class2 class3' );
	} );

	it( 'should handle mixed arrays and objects', () => {
		const result = cn( [ 'class1', { class2: true } ], 'class3' );
		expect( result ).toBe( 'class1 class2 class3' );
	} );

	it( 'should handle empty inputs gracefully', () => {
		const result = cn();
		expect( result ).toBe( '' );
	} );

	it( 'should handle null and undefined values gracefully', () => {
		const result = cn( 'class1', null, undefined, 'class2' );
		expect( result ).toBe( 'class1 class2' );
	} );

	it( 'should handle numeric values gracefully', () => {
		const result = cn( 'class1', 123, 'class2' );
		expect( result ).toBe( 'class1 123 class2' );
	} );
} );
