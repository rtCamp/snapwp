import * as dotenv from 'dotenv';
import type { CodegenConfig } from '@graphql-codegen/cli';
import { withCodegenConfig } from '@snapwp/codegen-config';

dotenv.config( { path: '../../.env' } );

const config: Partial< CodegenConfig > = {
	documents: './src/**/*.graphql',
};

export default withCodegenConfig( config );
