import type { SnapWPConfig } from '@snapwp/core/config';
import {
	ApolloClientEngine,
	type clientType,
	type clientOptionsType,
} from '@snapwp/plugin-apollo-client';

const config: SnapWPConfig< clientType, clientOptionsType > = {
	query: {
		engine: ApolloClientEngine,
	},
};

export default config;
