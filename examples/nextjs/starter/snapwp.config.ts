import type { SnapWPConfig } from '@snapwp/core/config';
import { ApolloClientEngine } from '@snapwp/plugin-apollo-client';

const config: SnapWPConfig = {
	query: {
		engine: ApolloClientEngine,
	},
};

export default config;
