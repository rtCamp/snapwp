// Importing this to fix the ReferenceError faced when importing next/server.
import 'isomorphic-fetch';

global.__snapWPConfig = {};

global.__envConfig = {
	nextUrl: 'https://env-next.example.com',
	homeUrl: 'https://env-home.example.com',
	siteUrl: 'https://env-home.example.com',
	graphqlEndpoint: 'env-index.php?graphql',
	uploadsDirectory: '/env-wp-content/uploads',
	restUrlPrefix: '/env-wp-json',
};

process.env.NEXT_PUBLIC_FRONTEND_URL = global.__envConfig.nextUrl;
process.env.NEXT_PUBLIC_WP_HOME_URL = global.__envConfig.homeUrl;
process.env.NEXT_PUBLIC_WP_SITE_URL = global.__envConfig.siteUrl;
process.env.NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT =
	global.__envConfig.graphqlEndpoint;
process.env.NEXT_PUBLIC_WP_UPLOADS_PATH = global.__envConfig.uploadsDirectory;
process.env.NEXT_PUBLIC_WP_REST_URL_PREFIX = global.__envConfig.restUrlPrefix;
