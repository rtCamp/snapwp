import { type ApolloQueryResult } from '@apollo/client';
import { Logger, GlobalStylesParseError } from '@snapwp/core';

import { type GetGlobalStylesQuery } from '@graphqlTypes/graphql';

import parseQueryResult from '../parse-global-styles';

jest.mock( '@snapwp/core', () => ( {
	...jest.requireActual( '@snapwp/core' ),
	Logger: {
		error: jest.fn(),
	},
} ) );

describe( 'parseQueryResult', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'should parse valid query data correctly', () => {
		const queryData: ApolloQueryResult< GetGlobalStylesQuery > = {
			data: {
				globalStyles: {
					customCss: 'body { color: red; }',
					stylesheet: 'styles.css',
					renderedFontFaces: '@font-face { font-family: "MyFont"; }',
				},
			},
			errors: [],
			loading: false,
			networkStatus: 7,
		};

		const result = parseQueryResult( queryData );

		expect( result ).toEqual( {
			customCss: 'body { color: red; }',
			globalStylesheet: 'styles.css',
			renderedFontFaces: '@font-face { font-family: "MyFont"; }',
		} );
	} );

	it( 'should log errors and still parse data if both data and errors exist', () => {
		const queryData: ApolloQueryResult< GetGlobalStylesQuery > = {
			data: {
				globalStyles: {
					customCss: 'body { color: blue; }',
					stylesheet: 'theme.css',
					renderedFontFaces:
						'@font-face { font-family: "OtherFont"; }',
				},
			},
			errors: [ { message: 'Sample error message' } ],
			loading: false,
			networkStatus: 7,
		};

		const result = parseQueryResult( queryData );

		expect( Logger.error ).toHaveBeenCalledWith(
			'Error fetching global styles: Sample error message',
			{ message: 'Sample error message' }
		);
		expect( result ).toEqual( {
			customCss: 'body { color: blue; }',
			globalStylesheet: 'theme.css',
			renderedFontFaces: '@font-face { font-family: "OtherFont"; }',
		} );
	} );

	it( 'should throw an error if `data.globalStyles` is null and errors exist', () => {
		const queryData: ApolloQueryResult< GetGlobalStylesQuery > = {
			data: { globalStyles: null },
			errors: [ { message: 'Critical error occurred' } ],
			loading: false,
			networkStatus: 7,
		};

		expect( () => parseQueryResult( queryData ) ).toThrow(
			GlobalStylesParseError
		);
		expect( Logger.error ).toHaveBeenCalledWith(
			'Error fetching global styles: Critical error occurred',
			{ message: 'Critical error occurred' }
		);
	} );

	it( 'should throw an error if `data.globalStyles` is null and no errors exist', () => {
		const queryData: ApolloQueryResult< GetGlobalStylesQuery > = {
			data: { globalStyles: null },
			// @ts-ignore
			// data: null,
			errors: [],
			loading: false,
			networkStatus: 7,
		};

		expect( () => parseQueryResult( queryData ) ).toThrow(
			GlobalStylesParseError
		);
		expect( Logger.error ).not.toHaveBeenCalled();
	} );
} );
