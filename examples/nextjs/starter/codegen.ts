import type { CodegenConfig } from '@graphql-codegen/cli';
import { sync as globSync } from 'glob';
import { withCodegenConfig } from '@snapwp/codegen-config';
import 'dotenv/config';

const GRAPHQL_GLOB = './src/**/*.graphql';
const graphqlFiles = globSync( GRAPHQL_GLOB );

const config: Partial< CodegenConfig > = {
	...( graphqlFiles.length > 0 && { documents: GRAPHQL_GLOB } ),
};

export default withCodegenConfig( config );
