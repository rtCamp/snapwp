declare global {
	namespace NodeJS {
		interface ProcessEnv {
			EDITOR?: string;
			GRAPHQL_SCHEMA_FILE?: string;
			INTROSPECTION_TOKEN?: string;
			CORS_PROXY_PREFIX?: string;
			FRONTEND_URL?: string;
			GRAPHQL_ENDPOINT?: string;
			REST_URL_PREFIX?: string;
			WP_HOME_URL?: string;
			WP_SITE_URL?: string;
			WP_UPLOADS_DIRECTORY?: string;
			NODE_ENV?: 'development' | 'production' | 'test';
		}
	}
}

export {};
