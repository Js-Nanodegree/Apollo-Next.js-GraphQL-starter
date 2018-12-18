import authMutations from './auth.mutations';
import authQueries from './auth.queries';
import userQueries from './user.queries';

import contentMutations from './content.mutations';
import contentQueries from './content.queries';


export default {
    Subscription: {

    },
    Mutation: {
        ...authMutations,
        ...contentMutations
    },
    Query: {
        ...authQueries,
        ...userQueries,
        ...contentQueries
    }
}
