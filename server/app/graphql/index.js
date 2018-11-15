import { ApolloServer } from "apollo-server-express";
import { formatError } from "apollo-errors";
import resolvers from './resolvers';
import typeDefs from './schema';

const options = {
  formatError
};

export default new ApolloServer({
  typeDefs,
  resolvers,
  options,
  formatError: error => {
    console.log(error);
    return error;
  },
  formatResponse: (response, info) => {
    console.log('--------------------------------------');
    console.log(info.queryString);
    return response;
  },
  context: ({ req, res }) => {
    return { req, res }
  }
});
