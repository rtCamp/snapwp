import * as dotenv from 'dotenv';
import { getBaseConfig } from '@snapwp/codegen-config';

dotenv.config( { path: '../../.env' } );

const config = getBaseConfig();
config.documents = './src/**/*.graphql';

export default config;
