import type { SnapWPConfig } from '@snapwp/core/config';
import { ApolloQueryClientAdapter } from '@snapwp/apollo';

const config: SnapWPConfig = {
	queryEngine: new ApolloQueryClientAdapter(),
};

export default config;
