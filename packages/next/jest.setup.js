global.__snapWPConfig = {};

global.__envConfig = {
	frontendUrl: 'https://example.com',
	wpHomeUrl: 'https://wp.example.com',
};

process.env.NEXT_PUBLIC_FRONTEND_URL = global.__envConfig.frontendUrl;
process.env.NEXT_PUBLIC_WP_HOME_URL = global.__envConfig.wpHomeUrl;
