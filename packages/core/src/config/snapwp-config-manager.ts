'use snapWPConfig';

import { Logger } from '@/logger';
import { generateGraphqlUrl, isValidUrl } from '@/utils';

import type { BlockDefinitions, QueryEngine } from '@snapwp/types';
import type { HTMLReactParserOptions } from 'html-react-parser';

export interface SnapWPEnv {
	/**
	 * URL prefix for WP assets loaded from 'wp-includes' dir . Defaults to `/proxy`.
	 */
	corsProxyPrefix?: string | undefined;
	/**
	 * The URL of the Next.js site. Defaults to `process.env.NEXT_PUBLIC_FRONTEND_URL`.
	 */
	frontendUrl: string;
	/**
	 * The GraphQL endpoint. Defaults to `graphql`.
	 */
	graphqlEndpoint: string;
	/**
	 * REST URL prefix. Defaults to `/wp-json`.
	 */
	restUrlPrefix: string;
	/**
	 * Uploads directory. Defaults to `/wp-content/uploads`.
	 */
	uploadsDirectory: string;
	/**
	 * The home URL of the WordPress site. Defaults to `process.env.NEXT_PUBLIC_WP_HOME_URL`.
	 */
	wpHomeUrl: string;
	/**
	 * The site URL of the WordPress site. Defaults to `process.env.NEXT_PUBLIC_WP_SITE_URL`.
	 */
	wpSiteUrl: string;
}

export interface SnapWPConfig< TClient = unknown, TClientOptions = unknown > {
	/**
	 * Block definitions for the editor.
	 */
	blockDefinitions?: BlockDefinitions;
	/**
	 * html-react-parser overload options
	 */
	parserOptions?: HTMLReactParserOptions;
	/**
	 * Query Engine
	 */
	query: QueryEngineConfig< TClient, TClientOptions >;
}

interface QueryEngineConfig< TClient, TClientOptions > {
	engine: new (
		options?: TClientOptions
	) => QueryEngine< TClient, TClientOptions >;
	options?: Parameters<
		QueryEngine< TClient, TClientOptions >[ 'init' ]
	>[ 0 ];
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
	corsProxyPrefix:
		// eslint-disable-next-line n/no-process-env -- We're using `NODE_ENV` to derive a default value.
		process.env.NODE_ENV === 'development' ? '/proxy' : undefined,
	graphqlEndpoint: 'index.php?graphql',
	restUrlPrefix: '/wp-json',
	uploadsDirectory: '/wp-content/uploads',
};

/**
 * Get the configuration from environment variables.
 *
 * This is a function (instead of a constant) so we can inject the variables in Jest.
 *
 * @return The configuration object.
 */
// @ts-ignore - ignore check for nextUrl,homeUrl to run missing environment variable test.
const envConfig = (): Partial< SnapWPEnv > => ( {
	/* eslint-disable n/no-process-env -- These are the env variables we want to manage. */
	corsProxyPrefix: process.env.NEXT_PUBLIC_CORS_PROXY_PREFIX,
	frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL,
	graphqlEndpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
	wpHomeUrl: process.env.NEXT_PUBLIC_WP_HOME_URL,
	restUrlPrefix: process.env.NEXT_PUBLIC_REST_URL_PREFIX,
	// If `wpSiteUrl` is not provided, use `wpHomeUrl`.
	wpSiteUrl:
		process.env.NEXT_PUBLIC_WP_SITE_URL ||
		process.env.NEXT_PUBLIC_WP_HOME_URL,
	uploadsDirectory: process.env.NEXT_PUBLIC_WP_UPLOADS_DIRECTORY,
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
		query: {
			type: 'object',
			required: true,
		},
	};

	/**
	 * The schema used to validate the configuration.
	 */
	static snapWPConfigEnvSchema: ConfigSchema< SnapWPEnv > = {
		corsProxyPrefix: {
			type: 'string',
			required: false,
		},
		frontendUrl: {
			type: 'string',
			required: true,
			/**
			 * Validate the URL.
			 *
			 * @param {string} value The value to validate.
			 *
			 * @throws {Error} If the value is invalid.
			 */
			validate: ( value ) => {
				if ( value && ! isValidUrl( value ) ) {
					throw new Error( '`frontendUrl` should be a valid URL.' );
				}
			},
		},
		graphqlEndpoint: {
			type: 'string',
			required: false,
		},
		wpHomeUrl: {
			type: 'string',
			required: true,
			/**
			 * Validate the URL.
			 *
			 * @param {string} value The value to validate.
			 *
			 * @throws {Error} If the value is invalid.
			 */
			validate: ( value ) => {
				if ( value && ! isValidUrl( value ) ) {
					throw new Error( '`wpHomeUrl` should be a valid URL.' );
				}
			},
		},
		wpSiteUrl: {
			type: 'string',
			required: false,
			/**
			 * Validate the URL.
			 *
			 * @param {string} value The value to validate.
			 * @throws {Error} If the value is invalid.
			 */
			validate: ( value ) => {
				if ( value && ! isValidUrl( value ) ) {
					throw new Error( '`wpSiteUrl` should be a valid URL.' );
				}
			},
		},
		restUrlPrefix: {
			type: 'string',
			required: false,
			/**
			 * Validate the REST URL prefix.
			 *
			 * @param {string} value The value to validate.
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
		uploadsDirectory: {
			type: 'string',
			required: false,
			/**
			 * Validate the uploads directory.
			 *
			 * @param {string} value The value to validate.
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
	};

	/**
	 * Normalizes the configuration.
	 *
	 * @param {Partial<Type>} cfg The configuration to normalize.
	 *
	 * @return The normalized configuration.
	 */
	static normalizeConfig = < T >( cfg: Partial< T > ): Partial< T > => {
		// Removing empty values.
		( Object.keys( cfg ) as Array< keyof T > ).forEach(
			( key: keyof T ) => {
				if ( cfg[ key ] === undefined ) {
					delete cfg[ key ];
				} else if (
					// @todo this should probably be moved into the schema as a sanitize callback.
					( key === 'wpHomeUrl' ||
						key === 'frontendUrl' ||
						key === 'wpSiteUrl' ) &&
					typeof cfg[ key ] === 'string'
				) {
					const value = cfg[ key ] as string;

					cfg[ key ] = ( value.endsWith( '/' )
						? value.slice( 0, -1 )
						: value ) as unknown as T[ keyof T ];
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
	 * @param {Partial<SnapWPConfig>} cfg The configuration object.
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
	 * @param {Partial<Type>}      config The configuration to validate.
	 * @param {ConfigSchema<Type>} schema The schema to validate the configuration against.
	 *
	 * @return The resolved configuration.
	 *
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
		 * @param {keyof Type} key The property key.
		 *
		 * @throws {Error} If the property is invalid.
		 */
		const validateProperty = ( key: keyof T ): void => {
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
			SnapWPConfigManager.getConfig().wpSiteUrl,
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
