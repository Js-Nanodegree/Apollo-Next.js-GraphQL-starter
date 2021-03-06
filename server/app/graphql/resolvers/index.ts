import { IResolvers } from 'apollo-server-express';
import { IS_DEBUG } from '../../config/env';
import authMutations from './auth.mutations';
import authQueries from './auth.queries';
import userMutations from './user.mutations';
import userQueries from './user.queries';
import inviteMutation from './invite.mutation';
import inviteQueries from './invite.queries';
import inviteSubscriptions from './invite.subscriptions';

interface TObject {
  resolveType: string;
}

const resolvers: IResolvers = {
  Node: {
    __resolveType(obj: TObject) {
      if (obj.resolveType) {
        return obj.resolveType;
      }
      if (IS_DEBUG) {
        // TODO Make this an apollo error and pass the obj to the data object
        throw new Error('Undefined resolve type for type Node');
      }
      return null;
    }
  },
  Subscription: {
    ...inviteSubscriptions
  },
  /* eslint-disable-next-line */
  Mutation: {
    ...authMutations,
    ...userMutations,
    ...inviteMutation
  } as IResolvers,
  /* eslint-disable-next-line */
  Query: {
    ...authQueries,
    ...userQueries,
    ...inviteQueries
  } as IResolvers
};

export default resolvers;
