'use snapWPConfig';
import { isValidUrl, generateGraphqlUrl } from '@/utils';
import { Logger } from '@/logger';
import { BlockDefinitions } from '@/props';

interface SnapWPEnvConfig {
	/**
	 * The URL of the Next.js site. Defaults to `process.env.NEXT_PUBLIC_URL`.
	 */
	nextUrl: string;
	/**
	 * The home URL of the WordPress site. Defaults to `process.env.NEXT_PUBLIC_WORDPRESS_URL`.
	 *
	 * TODO: Update variable name from homeUrl to siteUrl. ref: https://github.com/rtCamp/headless/pull/272#discussion_r1907601796
	 */
	homeUrl: string;
	/**
	 * The GraphQL endpoint. Defaults to `graphql`.
	 */
	graphqlEndpoint?: string;
	/**
	 * Uploads directory. Defaults to `/wp-content/uploads`.
	 */
	uploadsDirectory?: string;
	/**
	 * REST URL prefix. Defaults to `/wp-json`.
	 */
	restUrlPrefix?: string;
	/**
	 * URL prefix for WP assets loaded from 'wp-includes' dir . Defaults to `/proxy`.
	 */
	corsProxyPrefix?: string;
	/**
	 * Flag to enable cors middleware which proxies assets from WP server.
	 */
	useCorsProxy?: boolean;
}

export interface SnapWPConfig {
	/**
	 * Block definitions for the editor.
	 */
	blockDefinitions?: BlockDefinitions;
}

/**
 * Schema used to validate the configuration.
 */
type SnapWPConfigSchema< T > = {
	[ K in keyof T ]: {
		type: string;
		required: boolean;
		validate?: ( value: T[ K ] ) => void;
	};
};

/**
 * Default configuration.
 */
const defaultConfig: Partial< SnapWPEnvConfig & SnapWPConfig > = {
	graphqlEndpoint: 'index.php?graphql',
	uploadsDirectory: '/wp-content/uploads',
	restUrlPrefix: '/wp-json',
	corsProxyPrefix: '/proxy',
	// eslint-disable-next-line n/no-process-env
	useCorsProxy: process.env.NODE_ENV === 'development',
};

/**
 * Get the configuration from environment variables.
 *
 * This is a function (instead of a constant) so we can inject the variables in Jest.
 *
 * @return The configuration object.
 */
const envConfig = (): Partial< SnapWPEnvConfig > => ( {
	/* eslint-disable n/no-process-env */
	nextUrl: process.env.NEXT_PUBLIC_URL,
	homeUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL,
	graphqlEndpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
	uploadsDirectory: process.env.NEXT_PUBLIC_WORDPRESS_UPLOADS_PATH,
	restUrlPrefix: process.env.NEXT_PUBLIC_WORDPRESS_REST_URL_PREFIX,
	useCorsProxy: process.env.NEXT_PUBLIC_USE_CORS_PROXY === 'true',
	corsProxyPrefix: process.env.NEXT_PUBLIC_CORS_PROXY_PREFIX,
	/* eslint-enable n/no-process-env */
} );

/**
 * Singleton class for managing SnapWPConfig.
 */
class SnapWPConfigManager {
	/**
	 * The configuration.
	 */
	static config: SnapWPConfig & Required< SnapWPEnvConfig >;

	/**
	 * Flag to check if configs are set.
	 */
	static configsSet: boolean = false;

	/**
	 * The schema used to validate the configuration.
	 */
	static snapWPConfigSchema: SnapWPConfigSchema< SnapWPConfig > = {
		blockDefinitions: {
			type: 'object',
			required: false,
		},
	};

	/**
	 * The schema used to validate the configuration.
	 */
	static snapWPConfigEnvSchema: SnapWPConfigSchema< SnapWPEnvConfig > = {
		nextUrl: {
			type: 'string',
			required: true,
			/**
			 * Validate the URL.
			 *
			 * @param value The value to validate.
			 * @throws {Error} If the value is invalid.
			 */
			validate: ( value ) => {
				if ( value && ! isValidUrl( value ) ) {
					throw new Error( '`nextUrl` should be a valid URL.' );
				}
			},
		},
		homeUrl: {
			type: 'string',
			required: true,
			/**
			 * Validate the URL.
			 *
			 * @param value The value to validate.
			 * @throws {Error} If the value is invalid.
			 */
			validate: ( value ) => {
				if ( value && ! isValidUrl( value ) ) {
					throw new Error( '`homeUrl` should be a valid URL.' );
				}
			},
		},
		graphqlEndpoint: {
			type: 'string',
			required: false,
		},
		uploadsDirectory: {
			type: 'string',
			required: false,
			/**
			 * Validate the uploads directory.
			 *
			 * @param value The value to validate.
			 *
			 * @throws {Error} If the value is invalid.
			 */
			validate: ( value ) => {
				if ( value && ! value.startsWith( '/' ) ) {
					throw new Error(
						'`uploadsDirectory` should start with a forward slash.'
					);
				}
			},
		},
		restUrlPrefix: {
			type: 'string',
			required: false,
			/**
			 * Validate the REST URL prefix.
			 *
			 * @param value The value to validate.
			 *
			 * @throws {Error} If the value is invalid.
			 */
			validate: ( value ) => {
				if ( value && ! value.startsWith( '/' ) ) {
					throw new Error(
						'`restUrlPrefix` should start with a forward slash.'
					);
				}
			},
		},
		corsProxyPrefix: {
			type: 'string',
			required: false,
			/**
			 * Validate the CORS proxy prefix.
			 *
			 * @param value The value to validate.
			 *
			 * @throws {Error} If the value is invalid.
			 */
			validate: ( value ) => {
				if ( value && ! value.startsWith( '/' ) ) {
					throw new Error(
						'`corsProxyPrefix` should start with a forward slash.'
					);
				}
			},
		},
		useCorsProxy: {
			type: 'boolean',
			required: false,
		},
	};

	/**
	 * Normalizes the configuration.
	 *
	 * @param cfg The configuration to normalize.
	 * @return The normalized configuration.
	 */
	static normalizeConfig = < T >( cfg: Partial< T > ) => {
		// Removing empty values.
		( Object.keys( cfg ) as Array< keyof T > ).forEach(
			( key: keyof T ) => {
				if ( cfg[ key ] === undefined ) {
					delete cfg[ key ];
				}
			}
		);

		return cfg;
	};

	/**
	 * Get the configuration.
	 *
	 * @return The resolved configuration.
	 */
	static getConfig(): Readonly< SnapWPConfig & Required< SnapWPEnvConfig > > {
		if ( ! SnapWPConfigManager.configsSet ) {
			// @ts-ignore -- __snapWPConfig injected from WebPack
			SnapWPConfigManager.setConfig( __snapWPConfig );
		}

		// setConfig validates the config, so we can safely assert that it is a valid configuration.
		return {
			...SnapWPConfigManager.config,
		};
	}

	/**
	 * Set the configuration.
	 *
	 * Merges the configs:
	 * 1. Environment variables.
	 * 2. Config file.
	 * 3. Default values.
	 *
	 * @param cfg The configuration object.
	 */
	static setConfig( cfg?: Partial< SnapWPConfig > ): void {
		if ( SnapWPConfigManager.configsSet ) {
			Logger.error( 'Multiple calls to setConfig detected.' );
			return;
		}

		const snapWPEnvConfig =
			SnapWPConfigManager.validateConfig< SnapWPEnvConfig >(
				SnapWPConfigManager.normalizeConfig< SnapWPEnvConfig >(
					envConfig()
				),
				SnapWPConfigManager.snapWPConfigEnvSchema
			);

		const snapWPConfig = SnapWPConfigManager.validateConfig< SnapWPConfig >(
			SnapWPConfigManager.normalizeConfig< SnapWPConfig >( cfg || {} ),
			SnapWPConfigManager.snapWPConfigSchema
		);

		SnapWPConfigManager.config = {
			...defaultConfig,
			...snapWPEnvConfig,
			...snapWPConfig,
		} as SnapWPConfig & Required< SnapWPEnvConfig >;

		SnapWPConfigManager.configsSet = true;
	}

	/**
	 * Validate and resolve the configuration.
	 *
	 * @param config The configuration to validate.
	 * @param schema The schema to validate the configuration against.
	 *
	 * @return The resolved configuration.
	 * @throws {Error} If the configuration is invalid.
	 */
	static validateConfig = < T >(
		config: Partial< T >,
		schema: SnapWPConfigSchema< T >
	): T => {
		if ( typeof config !== 'object' ) {
			throw new Error( 'Configs should be an object.' );
		}

		/**
		 * Validate a property.
		 *
		 * @param key The property key.
		 *
		 * @throws {Error} If the property is invalid.
		 */
		const validateProperty = ( key: keyof T ) => {
			const prop = schema[ key ];
			const value = config[ key ];

			if ( ! prop ) {
				throw new Error( `Unknown property: ${ String( key ) }.` );
			}

			if ( prop.required && ! value ) {
				throw new Error(
					`Missing required property: ${ String( key ) }.`
				);
			}

			if ( value && prop.type && typeof value !== prop.type ) {
				throw new Error(
					`Property ${ String( key ) } should be of type ${
						prop.type
					}.`
				);
			}

			if ( prop.validate ) {
				//@ts-ignore
				prop.validate( value );
			}
		};

		// Validate each property.
		( Object.keys( config ) as Array< keyof T > ).forEach(
			( key: keyof T ) => {
				validateProperty( key );
			}
		);

		// If all properties are valid, return the resolved configuration.
		return config as T;
	};

	/**
	 * Get the GraphQL URL.
	 *
	 * @return The GraphQL URL.
	 */
	static getGraphqlUrl(): string {
		return generateGraphqlUrl(
			SnapWPConfigManager.getConfig().homeUrl,
			SnapWPConfigManager.getConfig().graphqlEndpoint
		);
	}
}

export const getConfig = SnapWPConfigManager.getConfig;
export const setConfig = SnapWPConfigManager.setConfig;
export const getGraphqlUrl = SnapWPConfigManager.getGraphqlUrl;

// Exporting for testing purposes.
export const _private =
	// eslint-disable-next-line n/no-process-env
	process.env.NODE_ENV === 'test'
		? {
				SnapWPConfigManager,
		  }
		: {};
