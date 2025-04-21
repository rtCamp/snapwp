import { Logger } from '@snapwp/core';
import { parseGeneralSettings } from '../parse-general-settings';

import type { ApolloQueryResult } from '@apollo/client';
import type { GetGeneralSettingsQuery } from '@graphqlTypes/graphql';

jest.mock( '@snapwp/core', () => ( {
	...jest.requireActual( '@snapwp/core' ),
	Logger: {
		error: jest.fn(),
	},
} ) );

describe( 'parseGeneralSettings', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'should parse valid query data correctly', () => {
		const queryData: ApolloQueryResult< GetGeneralSettingsQuery > = {
			data: {
				generalSettings: {
					siteIcon: {
						mediaItemUrl: 'https://snapwp.local/icon.png',
						mediaDetails: {
							sizes: [
								{
									sourceUrl:
										'https://snapwp.local/icon-100x100.png',
									height: '100',
									width: '100',
								},
								{
									sourceUrl:
										'https://snapwp.local/icon-200x200.png',
									height: '200',
									width: '200',
								},
							],
						},
					},
				},
			},
			errors: [],
			loading: false,
			networkStatus: 7,
		};

		const result = parseGeneralSettings( queryData );

		expect( result ).toEqual( {
			generalSettings: {
				siteIcon: {
					mediaItemUrl: 'https://snapwp.local/icon.png',
					mediaDetails: {
						sizes: [
							{
								sourceUrl:
									'https://snapwp.local/icon-100x100.png',
								height: '100',
								width: '100',
							},
							{
								sourceUrl:
									'https://snapwp.local/icon-200x200.png',
								height: '200',
								width: '200',
							},
						],
					},
				},
			},
		} );
	} );

	it( 'should return undefined if siteIcon is missing', () => {
		const queryData: ApolloQueryResult< GetGeneralSettingsQuery > = {
			data: {
				generalSettings: {},
			},
			errors: [],
			loading: false,
			networkStatus: 7,
		};

		const result = parseGeneralSettings( queryData );

		expect( result ).toBeUndefined();
	} );

	it( 'should return undefined if sizes are incomplete or invalid', () => {
		const queryData: ApolloQueryResult< GetGeneralSettingsQuery > = {
			data: {
				generalSettings: {
					siteIcon: {
						mediaItemUrl: 'https://snapwp.local/icon.png',
						mediaDetails: {
							sizes: [
								{
									sourceUrl:
										'https://snapwp.local/icon-100x100.png',
									height: '100',
									width: '100',
								},
								{ sourceUrl: '', height: '', width: '' },
							],
						},
					},
				},
			},
			errors: [],
			loading: false,
			networkStatus: 7,
		};

		const result = parseGeneralSettings( queryData );

		expect( result ).toEqual( {
			generalSettings: {
				siteIcon: {
					mediaItemUrl: 'https://snapwp.local/icon.png',
					mediaDetails: {
						sizes: [
							{
								sourceUrl:
									'https://snapwp.local/icon-100x100.png',
								height: '100',
								width: '100',
							},
						],
					},
				},
			},
		} );
	} );

	it( 'should log errors and still return valid data when there are query errors', () => {
		const queryData: ApolloQueryResult< GetGeneralSettingsQuery > = {
			data: {
				generalSettings: {
					siteIcon: {
						mediaItemUrl: 'https://snapwp.local/icon.png',
						mediaDetails: {
							sizes: [
								{
									sourceUrl:
										'https://snapwp.local/icon-100x100.png',
									height: '100',
									width: '100',
								},
							],
						},
					},
				},
			},
			errors: [ { message: 'Sample error message' } ],
			loading: false,
			networkStatus: 7,
		};

		const result = parseGeneralSettings( queryData );

		expect( Logger.error ).toHaveBeenCalledWith(
			'Error fetching global styles: [object Object]'
		);
		expect( result ).toEqual( {
			generalSettings: {
				siteIcon: {
					mediaItemUrl: 'https://snapwp.local/icon.png',
					mediaDetails: {
						sizes: [
							{
								sourceUrl:
									'https://snapwp.local/icon-100x100.png',
								height: '100',
								width: '100',
							},
						],
					},
				},
			},
		} );
	} );
} );
