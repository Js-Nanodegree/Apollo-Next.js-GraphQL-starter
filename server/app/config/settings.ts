import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT || 8080;

const DB_NAME = 'my-db';

export const db =
  process.env.MONGODB_URI || `mongodb://localhost:27017/${DB_NAME}`;

// The URL of the development client
export const DEV_URL = 'http://localhost:3000';

// The URL of the production client
export const PROD_URL = 'http://www.example.com';

// Emails will come from this address
export const SYSTEM_EMAIL_ADDRESS = process.env.SYSTEM_EMAIL_ADDRESS;

// Emails will be sent to this address in debug mode
export const DEBUG_EMAIL_ADDRESS = process.env.DEBUG_EMAIL_ADDRESS;
