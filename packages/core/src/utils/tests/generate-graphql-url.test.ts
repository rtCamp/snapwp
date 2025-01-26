import generateGraphqlUrl from '../generate-graphql-url';
import { Logger } from '../../logger';

jest.mock( '../../logger' );

describe( 'generateGraphqlUrl', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'should return an empty string and log an error if homeUrl is not provided', () => {
		const result = generateGraphqlUrl( undefined, '/graphql' );
		expect( result ).toBe( '' );
		expect( Logger.error ).toHaveBeenCalledWith( 'homeUrl is not set' );
	} );

	it( 'should return an empty string and log an error if graphqlEndpoint is not provided', () => {
		const result = generateGraphqlUrl( 'https://example.com', undefined );
		expect( result ).toBe( '' );
		expect( Logger.error ).toHaveBeenCalledWith(
			'graphqlEndpoint is not set'
		);
	} );

	it( 'should return the correct URL when both homeUrl and graphqlEndpoint are provided', () => {
		const result = generateGraphqlUrl( 'https://example.com', '/graphql' );
		expect( result ).toBe( 'https://example.com/graphql' );
	} );

	it( 'should handle homeUrl with trailing slash', () => {
		const result = generateGraphqlUrl( 'https://example.com/', '/graphql' );
		expect( result ).toBe( 'https://example.com/graphql' );
	} );

	it( 'should handle graphqlEndpoint without leading slash', () => {
		const result = generateGraphqlUrl( 'https://example.com', 'graphql' );
		expect( result ).toBe( 'https://example.com/graphql' );
	} );

	it( 'should handle both homeUrl with trailing slash and graphqlEndpoint without leading slash', () => {
		const result = generateGraphqlUrl( 'https://example.com/', 'graphql' );
		expect( result ).toBe( 'https://example.com/graphql' );
	} );

	it( 'should handle both homeUrl without trailing slash and graphqlEndpoint with leading slash', () => {
		const result = generateGraphqlUrl( 'https://example.com', '/graphql' );
		expect( result ).toBe( 'https://example.com/graphql' );
	} );

	it( 'should handle empty strings for homeUrl and graphqlEndpoint', () => {
		const result = generateGraphqlUrl( '', '' );
		expect( result ).toBe( '' );
		expect( Logger.error ).toHaveBeenCalledWith( 'homeUrl is not set' );
	} );
} );
