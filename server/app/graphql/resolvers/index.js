import authMutations from './auth.mutations';
import authQueries from './auth.queries';
import userQueries from './user.queries';

export default {
  Subscription: {},
  Mutation: {
    ...authMutations
  },
  Query: {
    ...authQueries,
    ...userQueries
  }
};
