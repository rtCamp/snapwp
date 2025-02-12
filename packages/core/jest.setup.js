global.__snapWPConfig = {};

global.__envConfig = {
	nextUrl: 'https://env-next.example.com',
	homeUrl: 'https://env-home.example.com',
	graphqlEndpoint: 'env-index.php?graphql',
	uploadsDirectory: '/env-wp-content/uploads',
	restUrlPrefix: '/env-wp-json',
};

process.env.NEXT_PUBLIC_URL = global.__envConfig.nextUrl;
process.env.NEXT_PUBLIC_WORDPRESS_URL = global.__envConfig.homeUrl;
process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT = global.__envConfig.graphqlEndpoint;
process.env.NEXT_PUBLIC_WORDPRESS_UPLOADS_PATH =
	global.__envConfig.uploadsDirectory;
process.env.NEXT_PUBLIC_WORDPRESS_REST_URL_PREFIX =
	global.__envConfig.restUrlPrefix;
