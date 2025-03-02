'use snapWPConfig';
import { isValidUrl, generateGraphqlUrl } from '@/utils';
import { Logger } from '@/logger';
import type { BlockDefinitions } from '@snapwp/types';
import type { HTMLReactParserOptions } from 'html-react-parser';

export interface SnapWPEnv {
	/**
	 * The URL of the Next.js site. Defaults to `process.env.NEXT_PUBLIC_URL`.
	 */
	nextUrl: string;
	/**
	 * The site URL of the WordPress site. Defaults to `process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL`.
	 */
	siteUrl: string;
	/**
	 * The home URL of the WordPress site. Defaults to `process.env.NEXT_PUBLIC_WORDPRESS_HOME_URL`.
	 */
	homeUrl: string;
	/**
	 * The GraphQL endpoint. Defaults to `graphql`.
	 */
	graphqlEndpoint: string;
	/**
	 * Uploads directory. Defaults to `/wp-content/uploads`.
	 */
	uploadsDirectory: string;
	/**
	 * REST URL prefix. Defaults to `/wp-json`.
	 */
	restUrlPrefix: string;
	/**
	 * URL prefix for WP assets loaded from 'wp-includes' dir . Defaults to `/proxy`.
	 */
	corsProxyPrefix: string;
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
	/**
	 * html-react-parser overload options
	 */
	parserOptions?: HTMLReactParserOptions;
}

/**
 * Schema used to validate the configuration.
 */
type ConfigSchema< T > = {
	[ K in keyof T ]: {
		type: string;
		required: boolean;
		validate?: ( value: T[ K ] ) => void;
	};
};

/**
 * Default configuration.
 */
const defaultConfig: Partial< SnapWPEnv & SnapWPConfig > = {
	graphqlEndpoint: 'index.php?graphql',
	uploadsDirectory: '/wp-content/uploads',
	restUrlPrefix: '/wp-json',
	corsProxyPrefix: '/proxy',
	// eslint-disable-next-line n/no-process-env -- We're using `NODE_ENV` to derive a default value.
	useCorsProxy: process.env.NODE_ENV === 'development',
};

/**
 * Get the configuration from environment variables.
 *
 * This is a function (instead of a constant) so we can inject the variables in Jest.
 *
 * @return The configuration object.
 */
const envConfig = (): Partial< SnapWPEnv > => ( {
	/* eslint-disable n/no-process-env -- These are the env variables we want to manage. */
	nextUrl: process.env.NEXT_PUBLIC_URL,
	siteUrl: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
	homeUrl: process.env.NEXT_PUBLIC_WORDPRESS_HOME_URL,
	graphqlEndpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
	uploadsDirectory: process.env.NEXT_PUBLIC_WORDPRESS_UPLOADS_PATH,
	restUrlPrefix: process.env.NEXT_PUBLIC_WORDPRESS_REST_URL_PREFIX,
	useCorsProxy: process.env.NEXT_PUBLIC_USE_CORS_PROXY === 'true',
	corsProxyPrefix: process.env.NEXT_PUBLIC_CORS_PROXY_PREFIX,
	/* eslint-enable n/no-process-env -- Rule restored. */
} );

/**
 * Singleton class for managing SnapWPConfig.
 */
class SnapWPConfigManager {
	/**
	 * The configuration.
	 */
	static config: SnapWPConfig & SnapWPEnv;

	/**
	 * Flag to check if configs are set.
	 */
	static configsSet: boolean = false;

	/**
	 * The schema used to validate the configuration.
	 */
	static snapWPConfigSchema: ConfigSchema< SnapWPConfig > = {
		blockDefinitions: {
			type: 'object',
			required: false,
		},
		parserOptions: {
			type: 'object',
			required: false,
		},
	};

	/**
	 * The schema used to validate the configuration.
	 */
	static snapWPConfigEnvSchema: ConfigSchema< SnapWPEnv > = {
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
		siteUrl: {
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
					throw new Error( '`siteUrl` should be a valid URL.' );
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
				} else if (
					// @todo this should probably be moved into the schema as a sanitize callback.
					( key === 'homeUrl' ||
						key === 'nextUrl' ||
						key === 'siteUrl' ) &&
					typeof cfg[ key ] === 'string'
				) {
					cfg[ key ] = ( cfg[ key ] as string ).endsWith( '/' )
						? ( ( cfg[ key ] as string ).slice(
								0,
								-1
						  ) as T[ keyof T ] )
						: cfg[ key ];
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
	static getConfig(): Readonly< SnapWPConfig & SnapWPEnv > {
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

		const snapWPEnv = SnapWPConfigManager.validateConfig< SnapWPEnv >(
			SnapWPConfigManager.normalizeConfig< SnapWPEnv >( envConfig() ),
			SnapWPConfigManager.snapWPConfigEnvSchema
		);

		const snapWPConfig = SnapWPConfigManager.validateConfig< SnapWPConfig >(
			SnapWPConfigManager.normalizeConfig< SnapWPConfig >( cfg || {} ),
			SnapWPConfigManager.snapWPConfigSchema
		);

		SnapWPConfigManager.config = {
			...defaultConfig,
			...snapWPEnv,
			...snapWPConfig,
		} as SnapWPConfig & Required< SnapWPEnv >;

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
		schema: ConfigSchema< T >
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
	// eslint-disable-next-line n/no-process-env -- `NODE_ENV` determines the environment.
	process.env.NODE_ENV === 'test'
		? {
				SnapWPConfigManager,
		  }
		: {};
