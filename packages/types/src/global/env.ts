declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV?: 'development' | 'production' | 'test';
			NEXT_PUBLIC_URL?: string;
			NEXT_PUBLIC_WORDPRESS_URL?: string;
			NEXT_PUBLIC_GRAPHQL_ENDPOINT?: string;
			INTROSPECTION_TOKEN?: string;
			NEXT_PUBLIC_WORDPRESS_REST_URL_PREFIX?: string;
			NEXT_PUBLIC_WORDPRESS_UPLOADS_PATH?: string;
			GRAPHQL_SCHEMA_FILE?: string;
			EDITOR?: string;
			NEXT_PUBLIC_USE_CORS_PROXY?: string;
			NEXT_PUBLIC_CORS_PROXY_PREFIX?: string;
		}
	}
}

export {};
