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
			CORS_PROXY_PREFIX?: string;
			FRONTEND_URL?: string;
			GRAPHQL_ENDPOINT?: string;
			REST_URL_PREFIX?: string;
			WP_HOME_URL?: string;
			WP_SITE_URL?: string;
			WP_UPLOADS_DIRECTORY?: string;
			readonly NODE_ENV?: 'development' | 'production' | 'test';
		}
	}
}

export {};
