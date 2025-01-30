import { Logger } from '@/logger';
import {
	type SnapWPConfig,
	_private,
	getConfig,
	setConfig,
	getGraphqlUrl,
} from '@/config/snapwp-config-manager';
const SnapWPConfigManager = _private.SnapWPConfigManager!;

describe( 'SnapWPConfigManager functions', () => {
	// eslint-disable-next-line n/no-process-env
	let ORIG_ENV: NodeJS.ProcessEnv;

	const validConfig: SnapWPConfig = {
		nextUrl: 'https://next.example.com',
		homeUrl: 'https://home.example.com',
		graphqlEndpoint: 'index.php?graphql',
		uploadsDirectory: '/wp-content/uploads',
		restUrlPrefix: '/wp-json',
	};

	const defaultConfig: SnapWPConfig = {
		graphqlEndpoint: 'index.php?graphql',
		uploadsDirectory: '/wp-content/uploads',
		restUrlPrefix: '/wp-json',
		corsProxyPrefix: '/proxy',
	};

	beforeEach( () => {
		SnapWPConfigManager.configsSet = false;
		jest.spyOn( Logger, 'error' ).mockImplementation( () => {} );
		jest.resetModules();
		// eslint-disable-next-line n/no-process-env
		ORIG_ENV = { ...process.env };
		// @ts-ignore Allow emptying global variable for testing
		global.backupSnapWPConfig = { ...global.__snapWPConfig };
	} );

	afterEach( () => {
		jest.restoreAllMocks();
		// @ts-ignore Allow emptying global variable for testing
		global.__snapWPConfig = global.backupSnapWPConfig;
		// @ts-ignore Allow emptying global variable for testing
		delete global.backupSnapWPConfig;
		process.env = {
			...ORIG_ENV,
		};
	} );

	it( 'should throw error when no process.env configs or snapWPConfigs are provided', () => {
		// @ts-ignore Allow emptying global variable for testing
		global.__snapWPConfig = {};
		process.env = {
			...ORIG_ENV,
		};

		// expect.toThrow wasn't working so using try-catch.
		try {
			getConfig();
		} catch ( e ) {
			if ( e instanceof Error ) {
				expect( e.message ).toBe(
					'Missing required property: nextUrl.'
				);
			}
		}
	} );

	it( 'should set the configuration correctly with environment variables and from __snapWPConfig', async () => {
		expect( getConfig() ).toEqual( {
			...defaultConfig,
			...validConfig,
			// @ts-ignore Allow setting global variable for testing
			...global.__envConfig,
		} );
	} );

	it( 'should log an error if setConfig is called multiple times', () => {
		setConfig( validConfig );
		setConfig( validConfig );
		expect( Logger.error ).toHaveBeenCalledWith(
			'Multiple calls to setConfig detected.'
		);
	} );

	it( 'should throw an error if nextUrl is missing', () => {
		process.env.NEXT_PUBLIC_URL = '';
		// @ts-ignore Allow setting global variable for testing
		global.__snapWPConfig = {};
		expect( () => getConfig() ).toThrow(
			'Missing required property: nextUrl'
		);
	} );

	it( 'should throw an error if nextUrl is not a string', () => {
		process.env.NEXT_PUBLIC_URL = 123 as unknown as string;
		// @ts-ignore Allow setting global variable for testing
		global.__snapWPConfig = {};
		expect( () => getConfig() ).toThrow(
			'Property nextUrl should be of type string'
		);
	} );

	it( 'should throw an error if nextUrl is not a valid URL', () => {
		process.env.NEXT_PUBLIC_URL = 'invalid-url';
		// @ts-ignore Allow setting global variable for testing
		global.__snapWPConfig = {};
		expect( () => getConfig() ).toThrow(
			'`nextUrl` should be a valid URL.'
		);
	} );

	it( 'should throw an error if homeUrl is missing', () => {
		process.env.NEXT_PUBLIC_WORDPRESS_URL = '';
		// @ts-ignore Allow setting global variable for testing
		global.__snapWPConfig = {};
		expect( () => getConfig() ).toThrow(
			'Missing required property: homeUrl'
		);
	} );

	it( 'should throw an error if homeUrl is not a string', () => {
		process.env.NEXT_PUBLIC_WORDPRESS_URL = 123 as unknown as string;
		// @ts-ignore Allow setting global variable for testing
		global.__snapWPConfig = {};
		expect( () => getConfig() ).toThrow(
			'Property homeUrl should be of type string'
		);
	} );

	it( 'should throw an error if homeUrl is not a valid URL', () => {
		process.env.NEXT_PUBLIC_WORDPRESS_URL = 'invalid-url';
		// @ts-ignore Allow setting global variable for testing
		global.__snapWPConfig = {};
		expect( () => getConfig() ).toThrow(
			'`homeUrl` should be a valid URL.'
		);
	} );

	it( 'should trim string values in the config', () => {
		delete process.env.NEXT_PUBLIC_URL;
		delete process.env.NEXT_PUBLIC_WORDPRESS_URL;
		delete process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
		delete process.env.NEXT_PUBLIC_WORDPRESS_UPLOADS_PATH;
		delete process.env.NEXT_PUBLIC_WORDPRESS_REST_URL_PREFIX;

		// @ts-ignore Allow setting global variable for testing
		global.__snapWPConfig = {
			nextUrl: ' https://next.example.com ',
			homeUrl: ' https://home.example.com ',
			graphqlEndpoint: ' index.php?graphql ',
			restUrlPrefix: ' /wp-json ',
			uploadsDirectory: ' /wp-content/uploads ',
		};

		expect( getConfig() ).toEqual( {
			nextUrl: 'https://next.example.com',
			homeUrl: 'https://home.example.com',
			graphqlEndpoint: 'index.php?graphql',
			restUrlPrefix: '/wp-json',
			uploadsDirectory: '/wp-content/uploads',
		} );
	} );

	it( 'should return the correct GraphQL URL', () => {
		delete process.env.NEXT_PUBLIC_URL;
		delete process.env.NEXT_PUBLIC_WORDPRESS_URL;
		delete process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
		delete process.env.NEXT_PUBLIC_WORDPRESS_UPLOADS_PATH;
		delete process.env.NEXT_PUBLIC_WORDPRESS_REST_URL_PREFIX;

		const graphqlUrl = getGraphqlUrl();
		expect( graphqlUrl ).toBe(
			'https://home.example.com/index.php?graphql'
		);
	} );

	it( 'should prioritize envConfig over validConfig and defaultConfig', () => {
		// @ts-ignore Allow setting global variable for testing
		const envConfig = global.__envConfig;
		expect( getConfig().nextUrl ).toBe( envConfig.nextUrl );
		expect( getConfig().homeUrl ).toBe( envConfig.homeUrl );

		expect( getConfig().graphqlEndpoint ).toBe( envConfig.graphqlEndpoint );

		expect( getConfig().uploadsDirectory ).toBe(
			envConfig.uploadsDirectory
		);

		expect( getConfig().restUrlPrefix ).toBe( envConfig.restUrlPrefix );
	} );

	it( 'should prioritize configs from config file over defaultConfig', () => {
		// @ts-ignore Allow setting global variable for testing
		global.__snapWPConfig = {
			nextUrl: 'https://partial-next.example.com',
		};
		delete process.env.NEXT_PUBLIC_URL;
		delete process.env.NEXT_PUBLIC_WORDPRESS_UPLOADS_PATH;
		delete process.env.NEXT_PUBLIC_WORDPRESS_REST_URL_PREFIX;

		expect( getConfig().nextUrl ).toBe(
			'https://partial-next.example.com'
		);
		// @ts-ignore Allow setting global variable for testing
		const envConfig = global.__envConfig;

		expect( getConfig().homeUrl ).toBe( envConfig.homeUrl );
		expect( getConfig().graphqlEndpoint ).toBe( envConfig.graphqlEndpoint );
		expect( getConfig().uploadsDirectory ).toBe(
			defaultConfig.uploadsDirectory
		);
		expect( getConfig().restUrlPrefix ).toBe( defaultConfig.restUrlPrefix );
	} );

	it( 'should handle missing environment variables correctly', () => {
		delete process.env.NEXT_PUBLIC_URL;
		delete process.env.NEXT_PUBLIC_WORDPRESS_URL;
		delete process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
		delete process.env.NEXT_PUBLIC_WORDPRESS_UPLOADS_PATH;
		delete process.env.NEXT_PUBLIC_WORDPRESS_REST_URL_PREFIX;

		expect( getConfig() ).toEqual( {
			...defaultConfig,
			...validConfig,
		} );
	} );

	it( 'should handle missing validConfig values correctly', () => {
		// @ts-ignore Allow setting global variable for testing
		global.__snapWPConfig = {
			homeUrl: 'https://partial-home.example.com',
		};

		expect( getConfig() ).toEqual( {
			...defaultConfig,
			// @ts-ignore Allow setting global variable for testing
			...global.__snapWPConfig,
			// @ts-ignore Allow setting global variable for testing
			...global.__envConfig,
		} );
	} );

	it( 'should throw an error if restUrlPrefix does not have forward slash', () => {
		process.env.NEXT_PUBLIC_WORDPRESS_REST_URL_PREFIX = 'wp-json';
		// @ts-ignore Allow setting global variable for testing
		global.__snapWPConfig = {};
		expect( () => getConfig() ).toThrow(
			'`restUrlPrefix` should start with a forward slash.'
		);
	} );

	it( 'should throw an error if uploadsDirectory does not have forward slash', () => {
		process.env.NEXT_PUBLIC_WORDPRESS_UPLOADS_PATH = 'wp-content/uploads';
		// @ts-ignore Allow setting global variable for testing
		global.__snapWPConfig = {};
		expect( () => getConfig() ).toThrow(
			'`uploadsDirectory` should start with a forward slash.'
		);
	} );
} );
