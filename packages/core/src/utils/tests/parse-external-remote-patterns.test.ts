import parseExternalRemotePatterns from '../parse-external-remote-patterns';

describe( 'parseExternalRemotePatterns', () => {
	it( 'should return default pattern if no string is provided', () => {
		const result = parseExternalRemotePatterns();
		expect( result ).toEqual( [
			{
				protocol: 'https',
				hostname: '**',
			},
		] );
	} );

	it( 'should return default pattern for empty strings', () => {
		const result = parseExternalRemotePatterns( '' );
		expect( result ).toEqual( [
			{
				protocol: 'https',
				hostname: '**',
			},
		] );
	} );

	it( 'should parse a single valid URL', () => {
		const result = parseExternalRemotePatterns( 'https://example.com' );
		expect( result ).toEqual( [
			{
				protocol: 'https',
				hostname: 'example.com',
				port: '',
				pathname: '/**',
			},
		] );
	} );

	it( 'should parse multiple valid URLs', () => {
		const result = parseExternalRemotePatterns(
			'https://example.com,https://another.com'
		);
		expect( result ).toEqual( [
			{
				protocol: 'https',
				hostname: 'example.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'another.com',
				port: '',
				pathname: '/**',
			},
		] );
	} );

	it( 'should handle URLs with ports', () => {
		const result = parseExternalRemotePatterns(
			'https://example.com:8080'
		);
		expect( result ).toEqual( [
			{
				protocol: 'https',
				hostname: 'example.com',
				port: '8080',
				pathname: '/**',
			},
		] );
	} );

	it( 'should handle URLs with paths', () => {
		const result = parseExternalRemotePatterns(
			'https://example.com/path'
		);
		expect( result ).toEqual( [
			{
				protocol: 'https',
				hostname: 'example.com',
				port: '',
				pathname: '/path/**',
			},
		] );
	} );

	it( 'should discard invalid URLs and return valid ones', () => {
		const result = parseExternalRemotePatterns(
			'https://example.com,invalid-url,https://another.com'
		);
		expect( result ).toEqual( [
			{
				protocol: 'https',
				hostname: 'example.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'another.com',
				port: '',
				pathname: '/**',
			},
		] );
	} );

	it( 'should return an empty array if all URLs are invalid', () => {
		const result = parseExternalRemotePatterns(
			'invalid-url1,invalid-url2'
		);
		expect( result ).toEqual( [] );
	} );
} );
