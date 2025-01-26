global.__snapWPConfig = {
	nextUrl: 'https://next.example.com',
	homeUrl: 'https://home.example.com',
	graphqlEndpoint: 'index.php?graphql',
	uploadsDirectory: '/wp-content/uploads',
	restUrlPrefix: '/wp-json',
};

const envConfig = {
	nextUrl: 'https://env-next.example.com',
	homeUrl: 'https://env-home.example.com',
	graphqlEndpoint: 'env-graphql',
	uploadsDirectory: '/env-uploads',
	restUrlPrefix: '/env-wp-json',
};

global.__envConfig = {
	...envConfig,
};

process.env.NEXT_PUBLIC_URL = envConfig.nextUrl;
process.env.NEXT_PUBLIC_WORDPRESS_URL = envConfig.homeUrl;
process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT = envConfig.graphqlEndpoint;
process.env.NEXT_PUBLIC_WORDPRESS_UPLOADS_PATH = envConfig.uploadsDirectory;
process.env.NEXT_PUBLIC_WORDPRESS_REST_URL_PREFIX = envConfig.restUrlPrefix;
