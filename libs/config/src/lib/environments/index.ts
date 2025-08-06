import * as dotenv from 'dotenv';
dotenv.config();

import { devConfig } from './development';
import { prodConfig } from './production';

const env = process.env['NODE_ENV'] || 'development';

export const config = env === 'production' ? prodConfig : devConfig;

