import type { SnapWPConfig } from '@snapwp/core/config';
import { ApolloQueryClientEngine } from '@snapwp/apollo';

const config: SnapWPConfig = {
	queryEngine: ApolloQueryClientEngine.getInstance(),
};

export default config;
