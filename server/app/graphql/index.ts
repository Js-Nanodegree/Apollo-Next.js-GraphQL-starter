import {Request, Response} from 'express';
import { ApolloServer } from 'apollo-server-express';
import { PubSub } from 'apollo-server-express';
import { formatError } from 'apollo-errors';
import resolvers from './resolvers';
import typeDefs from './schema';

type TContext = {
  req: Request;
  res: Response
}

type TInfo = {
  queryString: string;
}

// const options = {
//   formatError
// };

export const pubsub = new PubSub();

export default new ApolloServer({
  typeDefs,
  resolvers,
 // options,
  formatError: (error: Error) => {
    console.log(error);
    return error;
  },
  formatResponse: (response: any, info: TInfo) => {
    console.log('--------------------------------------');
    console.log(info.queryString);
    return response;
  },
  context: ({ req, res }: TContext) => {
    return { req, res };
  }
});
