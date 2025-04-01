import {
	_private,
	getConfig,
	setConfig,
	getGraphqlUrl,
	type SnapWPEnv,
} from '@/config/snapwp-config-manager';
import { Logger } from '@/logger';

const SnapWPConfigManager = _private.SnapWPConfigManager!;

/**
 * A mock React component used for testing block definitions.
 *
 * @return A div containing "Test Block".
 */
const MockBlockComponent = (): React.ReactNode => <div>Test Block</div>;

describe( 'SnapWPConfigManager functions', () => {
	let ORIG_ENV: NodeJS.ProcessEnv;

	const validSnapWPEnvConfig: Partial< SnapWPEnv > = {
		corsProxyPrefix:
			process.env.NODE_ENV === 'development' ? '/proxy' : undefined,
		frontendUrl: 'https://env-next.example.com',
		wpHomeUrl: 'https://env-home.example.com',
		graphqlEndpoint: 'env-index.php?graphql',
		uploadsDirectory: '/env-wp-content/uploads',
		restUrlPrefix: '/env-wp-json',
	};

	const defaultConfig: Partial< SnapWPEnv > = {
		corsProxyPrefix:
			process.env.NODE_ENV === 'development' ? '/proxy' : undefined,
		graphqlEndpoint: 'index.php?graphql',
		uploadsDirectory: '/wp-content/uploads',
		restUrlPrefix: '/wp-json',
	};

	beforeEach( () => {
		SnapWPConfigManager.configsSet = false;
		jest.spyOn( Logger, 'error' ).mockImplementation( jest.fn() );
		jest.resetModules();
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
		process.env = {
			...ORIG_ENV,
		};

		// expect.toThrow wasn't working so using try-catch.
		try {
			getConfig();
		} catch ( e ) {
			if ( e instanceof Error ) {
				expect( e.message ).toBe(
					'Missing required property: frontendUrl.'
				);
			}
		}
	} );

	it( 'should set the configuration correctly with environment variables and from __snapWPConfig', async () => {
		expect( getConfig() ).toEqual( {
			...defaultConfig,
			...validSnapWPEnvConfig,
			// @ts-ignore Allow setting global variable for testing
			...global.__envConfig,
		} );
	} );

	it( 'should log an error if setConfig is called multiple times', () => {
		setConfig();
		setConfig();
		expect( Logger.error ).toHaveBeenCalledWith(
			'Multiple calls to setConfig detected.'
		);
	} );

	it( 'should throw an error if frontendUrl is missing', () => {
		process.env.NEXT_PUBLIC_FRONTEND_URL = '';
		// @ts-ignore Allow setting global variable for testing
		global.__snapWPConfig = {};
		expect( () => getConfig() ).toThrow(
			'Missing required property: frontendUrl'
		);
	} );

	it( 'should throw an error if frontendUrl is not a string', () => {
		process.env.NEXT_PUBLIC_FRONTEND_URL = 123 as unknown as string;
		// @ts-ignore Allow setting global variable for testing
		global.__snapWPConfig = {};
		expect( () => getConfig() ).toThrow(
			'Property frontendUrl should be of type string'
		);
	} );

	it( 'should throw an error if frontendUrl is not a valid URL', () => {
		process.env.NEXT_PUBLIC_FRONTEND_URL = 'invalid-url';
		// @ts-ignore Allow setting global variable for testing
		global.__snapWPConfig = {};
		expect( () => getConfig() ).toThrow(
			'`frontendUrl` should be a valid URL.'
		);
	} );

	it( 'should throw an error if wpHomeUrl is missing', () => {
		process.env.NEXT_PUBLIC_WP_HOME_URL = '';
		// @ts-ignore Allow setting global variable for testing
		global.__snapWPConfig = {};
		expect( () => getConfig() ).toThrow(
			'Missing required property: wpHomeUrl'
		);
	} );

	it( 'should throw an error if wpHomeUrl is not a string', () => {
		process.env.NEXT_PUBLIC_WP_HOME_URL = 123 as unknown as string;
		// @ts-ignore Allow setting global variable for testing
		global.__snapWPConfig = {};
		expect( () => getConfig() ).toThrow(
			'Property wpHomeUrl should be of type string'
		);
	} );

	it( 'should throw an error if wpHomeUrl is not a valid URL', () => {
		process.env.NEXT_PUBLIC_WP_HOME_URL = 'invalid-url';
		// @ts-ignore Allow setting global variable for testing
		global.__snapWPConfig = {};
		expect( () => getConfig() ).toThrow(
			'`wpHomeUrl` should be a valid URL.'
		);
	} );

	it( 'should return the correct GraphQL URL', () => {
		const graphqlUrl = getGraphqlUrl();
		expect( graphqlUrl ).toBe(
			// @ts-ignore Allow setting global variable for testing
			`${ global.__envConfig.wpHomeUrl }/${ global.__envConfig.graphqlEndpoint }`
		);
	} );

	it( 'should prioritize envConfig over validConfig and defaultConfig', () => {
		// @ts-ignore Allow setting global variable for testing
		const envConfig = global.__envConfig;
		expect( getConfig().frontendUrl ).toBe( envConfig.frontendUrl );
		expect( getConfig().wpHomeUrl ).toBe( envConfig.wpHomeUrl );

		expect( getConfig().graphqlEndpoint ).toBe( envConfig.graphqlEndpoint );

		expect( getConfig().uploadsDirectory ).toBe(
			envConfig.uploadsDirectory
		);

		expect( getConfig().restUrlPrefix ).toBe( envConfig.restUrlPrefix );
	} );

	it( 'should handle missing environment variables correctly', () => {
		delete process.env.NEXT_PUBLIC_FRONTEND_URL;
		delete process.env.NEXT_PUBLIC_WP_HOME_URL;
		delete process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
		delete process.env.NEXT_PUBLIC_WP_UPLOADS_DIRECTORY;
		delete process.env.NEXT_PUBLIC_REST_URL_PREFIX;
		delete process.env.NEXT_PUBLIC_WP_SITE_URL;

		expect( getConfig() ).toEqual( {
			...defaultConfig,
		} );
	} );

	it( 'should handle missing validConfig values correctly', () => {
		expect( getConfig() ).toEqual( {
			...defaultConfig,
			// @ts-ignore Allow setting global variable for testing
			...global.__snapWPConfig,
			// @ts-ignore Allow setting global variable for testing
			...global.__envConfig,
		} );
	} );

	it( 'should throw an error if restUrlPrefix does not have forward slash', () => {
		process.env.NEXT_PUBLIC_REST_URL_PREFIX = 'wp-json';
		// @ts-ignore Allow setting global variable for testing
		global.__snapWPConfig = {};
		expect( () => getConfig() ).toThrow(
			'`restUrlPrefix` should start with a forward slash.'
		);
	} );

	it( 'should throw an error if uploadsDirectory does not have forward slash', () => {
		process.env.NEXT_PUBLIC_WP_UPLOADS_DIRECTORY = 'wp-content/uploads';
		// @ts-ignore Allow setting global variable for testing
		global.__snapWPConfig = {};
		expect( () => getConfig() ).toThrow(
			'`uploadsDirectory` should start with a forward slash.'
		);
	} );

	it( 'should correctly normalize URLs by removing trailing slashes', () => {
		process.env.NEXT_PUBLIC_FRONTEND_URL = 'https://localhost:3000/';
		process.env.NEXT_PUBLIC_WP_HOME_URL = 'https://wordpress.example.com/';

		const config = getConfig();

		expect( config.frontendUrl ).toBe( 'https://localhost:3000' );
		expect( config.wpHomeUrl ).toBe( 'https://wordpress.example.com' );
	} );

	it( 'should not include blockDefinitions if not set', () => {
		// @ts-ignore Allow setting global variable for testing
		global.__snapWPConfig = {};
		const config = getConfig();
		expect( config.blockDefinitions ).toBeUndefined();
	} );

	it( 'should correctly set and retrieve blockDefinitions with a React component', () => {
		const mockBlockDefinitions = { myBlock: MockBlockComponent };
		// @ts-ignore Allow setting global variable for testing
		global.__snapWPConfig = { blockDefinitions: mockBlockDefinitions };

		const config = getConfig();
		expect( config.blockDefinitions ).toEqual( mockBlockDefinitions );
		expect( config.blockDefinitions?.[ 'myBlock' ] ).toBe(
			MockBlockComponent
		);
	} );

	it( 'should throw an error if blockDefinitions is not an object', () => {
		expect( () => {
			// @ts-ignore - intentionally assigning invalid values
			setConfig( { blockDefinitions: 'invalid' } );
		} ).toThrow( 'Property blockDefinitions should be of type object.' );
	} );

	it( 'should throw an error if wpSiteUrl is not a string', () => {
		process.env.NEXT_PUBLIC_WP_SITE_URL = 123 as unknown as string;
		// @ts-ignore Allow setting global variable for testing
		global.__snapWPConfig = {};
		expect( () => getConfig() ).toThrow(
			'Property wpSiteUrl should be of type string'
		);
	} );

	it( 'should throw an error if wpSiteUrl is not a valid URL', () => {
		process.env.NEXT_PUBLIC_WP_SITE_URL = 'invalid-url';
		// @ts-ignore Allow setting global variable for testing
		global.__snapWPConfig = {};
		expect( () => getConfig() ).toThrow(
			'`wpSiteUrl` should be a valid URL.'
		);
	} );

	it( 'should correctly normalize wpSiteUrl by removing trailing slashes', () => {
		process.env.NEXT_PUBLIC_WP_SITE_URL = 'https://wordpress.example.com/';
		const config = getConfig();
		expect( config.wpSiteUrl ).toBe( 'https://wordpress.example.com' );
	} );

	it( 'should use wpHomeUrl if wpSiteUrl is empty', () => {
		delete process.env.NEXT_PUBLIC_WP_SITE_URL;
		process.env.NEXT_PUBLIC_WP_HOME_URL = 'https://wordpress.example.com';
		const config = getConfig();
		expect( config.wpSiteUrl ).toBe( 'https://wordpress.example.com' );
	} );
} );
