export const ENV = process.env.NODE_ENV || 'development';

export const IS_DEBUG = ENV === 'development';

export const IS_TEST = ENV === 'test';

export const SESSION_DURATION = 6.048e8; // 7 days
