import {IContext} from '../types/generic';

/*
 * Sends the user that exists on the request object
 */
function Me(context: IContext) {
  return context.req.user;
}

export default {
  Me
};
