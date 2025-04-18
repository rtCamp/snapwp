import type { SnapWPConfig } from '@snapwp/core/config';
import {
	ApolloQueryClientEngine,
	type clientType,
	type clientOptionsType,
} from '@snapwp/apollo';

const config: SnapWPConfig< clientType, clientOptionsType > = {
	query: {
		engine: ApolloQueryClientEngine,
	},
};

export default config;
