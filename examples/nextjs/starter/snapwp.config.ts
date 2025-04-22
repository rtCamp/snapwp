import type { SnapWPConfig } from '@snapwp/core/config';
import {
	ApolloClientEngine,
	type clientType,
	type clientOptionsType,
} from '@snapwp/plugin-apollo-client';

const config: SnapWPConfig< clientType, clientOptionsType > = {
	query: {
		// TODO: Find a way to fix this type error
		// @ts-expect-error TS2419: Class 'ApolloClientEngine' is not generic as the base interface so typescript is throwing an error.
		engine: ApolloClientEngine,
	},
};

export default config;
