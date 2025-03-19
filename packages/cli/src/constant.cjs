const REGISTRY_URL = 'http://localhost:4873';
const NPMRC_CONTENT = `@snapwp:registry=${ REGISTRY_URL }`;
const DEFAULT_PROJECT_PATH = './snapwp-app';
const EXCLUDED_FILES_PATTERN =
	/\/(node_modules|package-lock\.json|\.env|\.next|next-env\.d\.ts|src\/__generated)$/;

module.exports = {
	REGISTRY_URL,
	NPMRC_CONTENT,
	DEFAULT_PROJECT_PATH,
	EXCLUDED_FILES_PATTERN,
};
