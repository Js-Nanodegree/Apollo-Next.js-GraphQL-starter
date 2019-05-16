// PROXY_PATH is apth that your micro-proxy is listening to. This is is used for development only to replicate a real proxy like nginx
const DEVELOPMENT_PATH = 'http://localhost:3000/graphql';

// The path to your application in production. This should point to your GraphQL API
const PRODUCTION_PATH = 'https://example.com/graphql';

export const SERVER_PATH = 'http://localhost:8080/graphql';
export const CLIENT_PATH = 'https://example.com/graphql';

const DEVELOPMENT_WS_PATH = 'ws://localhost:8080/graphql';

const PRODUCTION_WS_PATH = 'wss://example.com/graphql';

export const IS_DEBUG = process.env.NODE_ENV !== 'production';

export const GRAPHQL_ENDPOINT = IS_DEBUG ? DEVELOPMENT_PATH : PRODUCTION_PATH;

export const WS_PATH = IS_DEBUG ? DEVELOPMENT_WS_PATH : PRODUCTION_WS_PATH;
