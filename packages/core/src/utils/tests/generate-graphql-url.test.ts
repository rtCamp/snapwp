import { Logger } from '../../logger';
import generateGraphqlUrl from '../generate-graphql-url';

jest.mock( '../../logger' );

describe( 'generateGraphqlUrl', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'should return an empty string and log an error if wpHomeUrl is not provided', () => {
		const result = generateGraphqlUrl( undefined, '/graphql' );
		expect( result ).toBe( '' );
		expect( Logger.error ).toHaveBeenCalledWith( 'wpHomeUrl is not set' );
	} );

	it( 'should return an empty string and log an error if graphqlEndpoint is not provided', () => {
		const result = generateGraphqlUrl( 'https://example.com', undefined );
		expect( result ).toBe( '' );
		expect( Logger.error ).toHaveBeenCalledWith(
			'graphqlEndpoint is not set'
		);
	} );

	it( 'should return the correct URL when both wpHomeUrl and graphqlEndpoint are provided', () => {
		const result = generateGraphqlUrl( 'https://example.com', '/graphql' );
		expect( result ).toBe( 'https://example.com/graphql' );
	} );

	it( 'should handle wpHomeUrl with trailing slash', () => {
		const result = generateGraphqlUrl( 'https://example.com/', '/graphql' );
		expect( result ).toBe( 'https://example.com/graphql' );
	} );

	it( 'should handle graphqlEndpoint without leading slash', () => {
		const result = generateGraphqlUrl( 'https://example.com', 'graphql' );
		expect( result ).toBe( 'https://example.com/graphql' );
	} );

	it( 'should handle both wpHomeUrl with trailing slash and graphqlEndpoint without leading slash', () => {
		const result = generateGraphqlUrl( 'https://example.com/', 'graphql' );
		expect( result ).toBe( 'https://example.com/graphql' );
	} );

	it( 'should handle both wpHomeUrl without trailing slash and graphqlEndpoint with leading slash', () => {
		const result = generateGraphqlUrl( 'https://example.com', '/graphql' );
		expect( result ).toBe( 'https://example.com/graphql' );
	} );

	it( 'should handle empty strings for wpHomeUrl and graphqlEndpoint', () => {
		const result = generateGraphqlUrl( '', '' );
		expect( result ).toBe( '' );
		expect( Logger.error ).toHaveBeenCalledWith( 'wpHomeUrl is not set' );
	} );
} );
