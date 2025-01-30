// eslint-disable-next-line jsdoc/check-tag-names
/** @type {import('@snapwp/core/config').SnapWPConfig} */
const config = {
	// Allow Proxy to WordPress assets (scripts, theme files, etc) to prevent CORS issues on localhost.
	useCorsProxy: process.env.NODE_ENV === 'development',
};

export default config;
