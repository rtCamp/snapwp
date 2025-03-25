import findElementAndGetClassNames from '../find-element-and-get-class-names';

describe( 'findElementAndGetClassNames', () => {
	it( 'returns class names when renderedHtml contains the specified class selector', () => {
		const renderedHtml = '<div class="test-class another-class"></div>';
		const elementSelector = '.test-class';
		const result = findElementAndGetClassNames(
			renderedHtml,
			elementSelector
		);
		expect( result ).toBe( 'test-class another-class' );
	} );

	it( 'returns class names when renderedHtml contains the specified id selector', () => {
		const renderedHtml =
			'<div id="test-id" class="test-class another-class"></div>';
		const elementSelector = '#test-id';
		const result = findElementAndGetClassNames(
			renderedHtml,
			elementSelector
		);
		expect( result ).toBe( 'test-class another-class' );
	} );

	it( 'returns class names when renderedHtml contains the specified tag name', () => {
		const renderedHtml = '<div class="test-class another-class"></div>';
		const elementSelector = 'div';
		const result = findElementAndGetClassNames(
			renderedHtml,
			elementSelector
		);
		expect( result ).toBe( 'test-class another-class' );
	} );

	it( 'returns an empty string when renderedHtml does not contain the specified selector', () => {
		const renderedHtml = '<div class="some-other-class"></div>';
		const elementSelector = '.non-existent-class';
		const result = findElementAndGetClassNames(
			renderedHtml,
			elementSelector
		);
		expect( result ).toBe( '' );
	} );

	it( 'returns an empty string when renderedHtml is null', () => {
		const renderedHtml = null;
		const elementSelector = '.test-class';
		const result = findElementAndGetClassNames(
			renderedHtml,
			elementSelector
		);
		expect( result ).toBe( '' );
	} );

	it( 'returns an empty string when renderedHtml is undefined', () => {
		const renderedHtml = undefined;
		const elementSelector = '.test-class';
		const result = findElementAndGetClassNames(
			renderedHtml,
			elementSelector
		);
		expect( result ).toBe( '' );
	} );

	it( 'returns an empty string when renderedHtml is an empty string', () => {
		const renderedHtml = '';
		const elementSelector = '.test-class';
		const result = findElementAndGetClassNames(
			renderedHtml,
			elementSelector
		);
		expect( result ).toBe( '' );
	} );

	it( 'returns class names of the first element when no selector is provided', () => {
		const renderedHtml = '<div class="test-class another-class"></div>';
		const result = findElementAndGetClassNames( renderedHtml );
		expect( result ).toBe( 'test-class another-class' );
	} );
} );
