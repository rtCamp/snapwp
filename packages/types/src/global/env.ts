declare global {
	namespace NodeJS {
		interface ProcessEnv {
			EDITOR?: string;
			GRAPHQL_SCHEMA_FILE?: string;
			INTROSPECTION_TOKEN?: string;
			NEXT_PUBLIC_CORS_PROXY_PREFIX?: string;
			NEXT_PUBLIC_FRONTEND_URL?: string;
			NEXT_PUBLIC_GRAPHQL_ENDPOINT?: string;
			NEXT_PUBLIC_REST_URL_PREFIX?: string;
			NEXT_PUBLIC_WP_HOME_URL?: string;
			NEXT_PUBLIC_WP_SITE_URL?: string;
			NEXT_PUBLIC_WP_UPLOADS_DIRECTORY?: string;
			NODE_ENV?: 'development' | 'production' | 'test';
		}
	}
}

export {};
