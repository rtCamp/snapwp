import type { SnapWPConfig } from '@snapwp/core/config';
import {
	ApolloQueryClientEngine,
	type clientType,
	type clientOptionsType,
} from '@snapwp/plugin-apollo-client';

const config: SnapWPConfig< clientType, clientOptionsType > = {
	query: {
		engine: ApolloQueryClientEngine,
	},
};

export default config;
