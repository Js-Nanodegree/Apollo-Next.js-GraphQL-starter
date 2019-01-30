/*
 Secrets should be defined in a .env files that is location in /server
 */

import dotenv from 'dotenv';

dotenv.config();

export const SIGNING_KEY = process.env.SIGNING_KEY;

export const MAILGUN_CONFIG = {
    apiKey: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_DOMAIN
};