global.__snapWPConfig = {};

global.__envConfig = {
	frontendUrl: 'https://env-next.example.com',
	wpHomeUrl: 'https://env-home.example.com',
	wpSiteUrl: 'https://env-home.example.com/wp',
	graphqlEndpoint: 'env-index.php?graphql',
	uploadsDirectory: '/env-wp-content/uploads',
	restUrlPrefix: '/env-wp-json',
};

process.env.NEXT_PUBLIC_FRONTEND_URL = global.__envConfig.frontendUrl;
process.env.NEXT_PUBLIC_WP_HOME_URL = global.__envConfig.wpHomeUrl;
process.env.WP_SITE_URL = global.__envConfig.wpSiteUrl;
process.env.GRAPHQL_ENDPOINT = global.__envConfig.graphqlEndpoint;
process.env.WP_UPLOADS_DIRECTORY = global.__envConfig.uploadsDirectory;
process.env.REST_URL_PREFIX = global.__envConfig.restUrlPrefix;
