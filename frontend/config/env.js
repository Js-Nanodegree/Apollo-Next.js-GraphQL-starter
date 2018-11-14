// PROXY_PATH is apth that your micro-proxy is listening to. This is is used for development only to replicate a real proxy like nginx
const DEVELOPMENT_PATH = 'http://localhost:3000/graphql'

// The path to your application in production. This should point to your GraphQL API
const PRODUCTION_PATH = 'https://example.com/graphql'

export const IS_DEBUG = process.env.NODE_ENV !== 'production'

export const GRAPHQL_ENDPOINT = IS_DEBUG ? DEVELOPMENT_PATH : PRODUCTION_PATH