import dotenv from 'dotenv';

dotenv.config();

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

export const port = normalizePort(process.env.PORT || '8080');

export const db = process.env.MONGODB_URI || 'mongodb://localhost:27017/ucid';

// The URL of the development client
export const DEV_URL = `http://localhost:3000`;

// The URL of the production client
export const PROD_URL = 'http://www.example.com';


// Emails will come from this address
export const SYSTEM_EMAIL_ADDRESS = process.env.SYSTEM_EMAIL_ADDRESS;

// Emails will be sent to this address in debug mode
export const DEBUG_EMAIL_ADDRESS = process.env.DEBUG_EMAIL_ADDRESS;