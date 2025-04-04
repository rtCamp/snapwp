import { GlobalStylesParseError, Logger } from '@snapwp/core';
import parseQueryResult from '../parse-global-styles';

import type { GetGlobalStylesQuery } from '@graphqlTypes/graphql';

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
		const queryData: GetGlobalStylesQuery = {
			globalStyles: {
				customCss: 'body { color: red; }',
				stylesheet: 'styles.css',
				renderedFontFaces: '@font-face { font-family: "MyFont"; }',
			},
		};

		const result = parseQueryResult( queryData );

		expect( result ).toEqual( {
			customCss: 'body { color: red; }',
			globalStylesheet: 'styles.css',
			renderedFontFaces: '@font-face { font-family: "MyFont"; }',
		} );
	} );

	it( 'should log errors and still parse data if both data and errors exist', () => {
		const queryData: GetGlobalStylesQuery = {
			globalStyles: {
				customCss: 'body { color: blue; }',
				stylesheet: 'theme.css',
				renderedFontFaces: '@font-face { font-family: "OtherFont"; }',
			},
		};

		const result = parseQueryResult( queryData );

		expect( result ).toEqual( {
			customCss: 'body { color: blue; }',
			globalStylesheet: 'theme.css',
			renderedFontFaces: '@font-face { font-family: "OtherFont"; }',
		} );
	} );

	it( 'should throw an error if `data.globalStyles` is null and errors exist', () => {
		const queryData: GetGlobalStylesQuery = {
			globalStyles: null,
		};

		expect( () => parseQueryResult( queryData ) ).toThrow(
			GlobalStylesParseError
		);
	} );

	it( 'should throw an error if `data.globalStyles` is null and no errors exist', () => {
		const queryData: GetGlobalStylesQuery = {
			globalStyles: null,
		};

		expect( () => parseQueryResult( queryData ) ).toThrow(
			GlobalStylesParseError
		);
		expect( Logger.error ).not.toHaveBeenCalled();
	} );
} );
