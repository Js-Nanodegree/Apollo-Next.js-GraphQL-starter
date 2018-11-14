import {ApolloServer} from "apollo-server-express";
import resolvers from './resolvers';
import typeDefs from './schema';

export default new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req, res}) => {
        return {req, res};
    },
  formatError: error => {
    console.error(error);
    return new Error('Internal server error');
  },
});
