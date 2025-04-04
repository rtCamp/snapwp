import type { SnapWPConfig } from '@snapwp/core/config';
import { ApolloQueryClientAdapter } from '@snapwp/apollo';

const config: SnapWPConfig = {
	queryEngine: ApolloQueryClientAdapter.getInstance(),
};

export default config;
