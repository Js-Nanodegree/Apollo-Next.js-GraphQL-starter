import { GraphQLError } from 'graphql';
import { ApolloServer } from 'apollo-server-express';
import { PubSub } from 'apollo-server-express';
import resolvers from './resolvers';
import typeDefs from './schema';
import { IContext } from 'generic';

export const pubsub = new PubSub();

export default new ApolloServer({
  typeDefs,
  resolvers,
  /*
   * GraphQL errors can be formatted into any shape you want. Available fields are on GraphQLError
   */
  formatError: (error: GraphQLError) => {
    // eslint-disable-next-line
    console.log(error);
    return error;
  },
  context: ({ req, res }: IContext) => {
    return { req, res };
  }
});
