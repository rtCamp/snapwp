import { TemplateParseError, GlobalStylesParseError } from '@/errors';

describe( 'TemplateParseError', () => {
	it( 'should create an error with the correct message and name', () => {
		const errorMessage = 'Error parsing template';
		const error = new TemplateParseError( errorMessage );

		expect( error.message ).toBe( errorMessage );
		expect( error.name ).toBe( 'TemplateParseError' );
	} );

	it( 'should be an instance of Error', () => {
		const error = new TemplateParseError( 'Error parsing template' );
		expect( error ).toBeInstanceOf( Error );
	} );
} );

describe( 'GlobalStylesParseError', () => {
	it( 'should create an error with the correct message and name', () => {
		const errorMessage = 'Error parsing global styles';
		const error = new GlobalStylesParseError( errorMessage );

		expect( error.message ).toBe( errorMessage );
		expect( error.name ).toBe( 'GlobalStylesParseError' );
	} );

	it( 'should be an instance of Error', () => {
		const error = new GlobalStylesParseError(
			'Error parsing global styles'
		);
		expect( error ).toBeInstanceOf( Error );
	} );
} );
