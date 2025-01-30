'use snapWPConfig';
import { isValidUrl, generateGraphqlUrl } from '@/utils';
import { Logger } from '@/logger';

export interface SnapWPConfig {
	/**
	 * The URL of the Next.js site. Defaults to `process.env.NEXT_PUBLIC_URL`.
	 */
	nextUrl?: string;
	/**
	 * The home URL of the WordPress site. Defaults to `process.env.NEXT_PUBLIC_WORDPRESS_URL`.
	 *
	 * TODO: Update variable name from homeUrl to siteUrl. ref: https://github.com/rtCamp/headless/pull/272#discussion_r1907601796
	 */
	homeUrl?: string;
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
}

/**
 * Schema used to validate the configuration.
 */
type SnapWPConfigSchema = {
	[ K in keyof SnapWPConfig ]: {
		type: string;
		required: boolean;
		validate?: ( value: SnapWPConfig[ K ] ) => void;
	};
};

/**
 * Default configuration.
 */
const defaultConfig: SnapWPConfig = {
	graphqlEndpoint: 'index.php?graphql',
	uploadsDirectory: '/wp-content/uploads',
	restUrlPrefix: '/wp-json',
	corsProxyPrefix: '/proxy',
};

/**
 * Get the configuration from environment variables.
 *
 * This is a function (instead of a constant) so we can inject the variables in Jest.
 *
 * @return The configuration object.
 */
const envConfig = (): SnapWPConfig => ( {
	/* eslint-disable n/no-process-env */
	nextUrl: process.env.NEXT_PUBLIC_URL,
	homeUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL,
	graphqlEndpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
	uploadsDirectory: process.env.NEXT_PUBLIC_WORDPRESS_UPLOADS_PATH,
	restUrlPrefix: process.env.NEXT_PUBLIC_WORDPRESS_REST_URL_PREFIX,
	/* eslint-enable n/no-process-env */
} );

/**
 * Normalizes the configuration.
 *
 * Merges the configs using the following hierarchy:
 * 1. Environment variables.
 * 2. Config file.
 * 3. Default values.
 *
 * @param cfg The configuration to normalize.
 * @return The normalized configuration.
 */
function normalizeConfig( cfg: SnapWPConfig ): SnapWPConfig {
	// Removing empty values.
	( Object.keys( cfg ) as Array< keyof SnapWPConfig > ).forEach(
		( key: keyof SnapWPConfig ) => {
			// Trim the value if it is a string.
			if ( typeof cfg[ key ] === 'string' ) {
				cfg[ key ] = cfg[ key ]?.trim();
			}

			if ( cfg[ key ] === undefined || cfg[ key ] === '' ) {
				delete cfg[ key ];
			}
		}
	);

	return cfg;
}

/**
 * Singleton class for managing SnapWPConfig.
 */
class SnapWPConfigManager {
	/**
	 * The configuration.
	 */
	static config: SnapWPConfig;

	/**
	 * Flag to check if configs are set.
	 */
	static configsSet: boolean = false;

	/**
	 * The schema used to validate the configuration.
	 */
	static schema: SnapWPConfigSchema = {
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
	};

	/**
	 * Get the configuration.
	 *
	 * @return The resolved configuration.
	 */
	static getConfig(): Readonly< Required< SnapWPConfig > > {
		if ( ! SnapWPConfigManager.configsSet ) {
			// @ts-ignore -- __snapWPConfig injected from WebPack
			SnapWPConfigManager.setConfig( __snapWPConfig );
		}

		// setConfig validates the config, so we can safely assert that it is a valid configuration.
		return {
			...SnapWPConfigManager.config,
		} as Required< SnapWPConfig >;
	}

	/**
	 * Set the configuration.
	 *
	 * @param cfg The configuration object.
	 */
	static setConfig( cfg: SnapWPConfig ): void {
		if ( SnapWPConfigManager.configsSet ) {
			Logger.error( 'Multiple calls to setConfig detected.' );
			return;
		}

		// Hierarchy is valueFromEnv -> valueFromConfig -> defaultValue where valueFromEnv is the highest priority.
		const mergedConfig: SnapWPConfig = {
			...defaultConfig,
			...normalizeConfig( cfg ),
			...normalizeConfig( envConfig() ),
		};

		// Validate and store resolved configuration.
		SnapWPConfigManager.config =
			SnapWPConfigManager.validateConfig( mergedConfig );
		SnapWPConfigManager.configsSet = true;
	}

	/**
	 * Validate and resolve the configuration.
	 *
	 * @param config The configuration to validate.
	 * @return The resolved configuration.
	 * @throws {Error} If the configuration is invalid.
	 */
	static validateConfig( config: SnapWPConfig ): Required< SnapWPConfig > {
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
		const validateProperty = ( key: keyof SnapWPConfig ) => {
			const prop = SnapWPConfigManager.schema[ key ];
			const value = config[ key ];

			if ( ! prop ) {
				throw new Error( `Unknown property: ${ key }.` );
			}

			if ( prop.required && ! value ) {
				throw new Error( `Missing required property: ${ key }.` );
			}

			if ( value && prop.type && typeof value !== prop.type ) {
				throw new Error(
					`Property ${ key } should be of type ${ prop.type }.`
				);
			}

			if ( prop.validate ) {
				prop.validate( value );
			}
		};

		// Validate each property.
		(
			Object.keys( SnapWPConfigManager.schema ) as Array<
				keyof SnapWPConfig
			>
		 ).forEach( ( key: keyof SnapWPConfig ) => {
			validateProperty( key );
		} );

		// If all properties are valid, return the resolved configuration.
		return config as Required< SnapWPConfig >;
	}

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
