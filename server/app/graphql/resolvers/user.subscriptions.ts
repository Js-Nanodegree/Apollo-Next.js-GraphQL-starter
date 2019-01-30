import { USER_ADDED } from '../../constants/types';
import { pubsub } from '../index';

export default {
  userAdded: {
    // Call publish to use this subscription, example:
    // pubsub.publish(USER_ADDED, { userAdded: args })
    subscribe: () => pubsub.asyncIterator(USER_ADDED)
  }
};
