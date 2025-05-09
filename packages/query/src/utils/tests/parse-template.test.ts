import { TemplateParseError } from '@snapwp/core';

import { type GetCurrentTemplateQuery } from '@graphqlTypes/graphql';

import { parseQueryResult } from '@/utils/parse-template';

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
		const queryData: GetCurrentTemplateQuery = {
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
			is404: false,
		} );
	} );

	it( 'should throw an error if `data` is null and errors exist', () => {
		const queryData: GetCurrentTemplateQuery = {
			templateByUri: null,
		};

		expect( () =>
			parseQueryResult( queryData, wordpressUrl, uri )
		).toThrow( TemplateParseError );
	} );

	it( 'should return is404 true if `templateByUri.is404` is true', () => {
		const queryData: GetCurrentTemplateQuery = {
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
				is404: true,
			},
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
			is404: true,
		} );
	} );
} );
