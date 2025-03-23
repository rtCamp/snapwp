import type { SnapWPConfig } from '@snapwp/core/config';
import { TanStackQueryEngine } from '@snapwp/tanstack';

const config: SnapWPConfig = {
	queryEngine: new TanStackQueryEngine( {
		defaultOptions: {
			queries: {
				staleTime: Infinity,
			},
		},
	} ),
};

export default config;
