import { ApolloQueryResult } from '@apollo/client';
import { Logger, TemplateParseError } from '@snapwp/core';
import parseQueryResult from '@/utils/parse-template';
import { GetCurrentTemplateQuery } from '@graphqlTypes/graphql';

jest.mock( '@snapwp/core', () => ( {
	...jest.requireActual( '@snapwp/core' ),
	Logger: {
		error: jest.fn(),
	},
} ) );

describe( 'parseQueryResult', () => {
	const wordpressUrl = 'https://test.com';
	const uri = '/sample-template';

	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'should parse valid query data correctly', () => {
		const queryData: ApolloQueryResult< GetCurrentTemplateQuery > = {
			data: {
				templateByUri: {
					bodyClasses: [ 'class1', 'class2' ],
					enqueuedScripts: {
						nodes: [
							{
								id: '122',
								src: '/script.js',
								handle: 'test-script',
							},
							{
								id: '123',
								src: 'https://cdn.com/script.js',
								handle: 'cdn-script',
							},
						],
					},
					enqueuedStylesheets: {
						nodes: [
							{
								src: '/style.css',
								handle: 'test-style',
								before: [ 'before-content' ],
								after: [ 'after-content' ],
							},
						],
					},
					editorBlocks: [
						{
							type: 'core/paragraph',
							renderedHtml: '<p>Text</p>',
						},
					],
				},
			},
			errors: [],
			loading: false,
			networkStatus: 7,
		};

		const result = parseQueryResult( queryData, wordpressUrl, uri );

		expect( result ).toEqual( {
			stylesheets: [
				{
					src: 'https://test.com/style.css',
					handle: 'test-style',
					before: 'before-content',
					after: 'after-content',
				},
			],
			editorBlocks: [
				{
					type: 'core/paragraph',
					renderedHtml: '<p>Text</p>',
				},
			],
			scriptModules: undefined,
			scripts: [
				{ src: 'https://test.com/script.js', handle: 'test-script' },
				{ src: 'https://cdn.com/script.js', handle: 'cdn-script' },
			],
			bodyClasses: [ 'class1', 'class2' ],
		} );
	} );

	it( 'should throw an error if `data` is null and errors exist', () => {
		const queryData: ApolloQueryResult< GetCurrentTemplateQuery > = {
			data: { templateByUri: null },
			errors: [ { message: 'Critical error occurred' } ],
			loading: false,
			networkStatus: 7,
		};

		expect( () =>
			parseQueryResult( queryData, wordpressUrl, uri )
		).toThrow( TemplateParseError );

		expect( Logger.error ).toHaveBeenCalledWith(
			'Error fetching template data: Critical error occurred.',
			'(Please refer to our FAQs for steps to debug and fix)',
			{ message: 'Critical error occurred' }
		);
	} );
} );
