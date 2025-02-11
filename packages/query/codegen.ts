import * as dotenv from 'dotenv';
import { baseConfig } from '@snapwp/codegen-config';

dotenv.config( { path: '../../.env' } );

const config = baseConfig();
config.documents = './src/**/*.graphql';

export default config;
