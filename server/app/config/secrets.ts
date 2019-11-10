/*
 Secrets should be defined in a .env files that is location in /server
 */

import dotenv from 'dotenv';

dotenv.config();

import { IS_DEBUG, IS_TEST } from './env';

export const SIGNING_KEY =
  IS_DEBUG || IS_TEST ? 'TEST_SIGNING_KEY' : process.env.SIGNING_KEY;
