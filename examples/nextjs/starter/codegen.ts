import { sync as globSync } from 'glob';
import { getBaseConfig } from '@snapwp/codegen-config';
import 'dotenv/config';

const GRAPHQL_GLOB = './src/**/*.graphql';
const graphqlFiles = globSync( GRAPHQL_GLOB );

const config = getBaseConfig();

if ( graphqlFiles.length > 0 ) {
	config.documents = GRAPHQL_GLOB;
}

export default config;
