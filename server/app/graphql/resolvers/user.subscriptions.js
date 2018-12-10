import { USER_ADDED } from '../../constants/types';
import { pubsub } from '../index';

export default {
  userAdded: {
    subscribe: () => pubsub.asyncIterator(USER_ADDED)
  }
};
