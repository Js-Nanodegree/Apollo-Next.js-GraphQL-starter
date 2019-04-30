import Controller from '../../controllers/user.controller';
import { IContext } from '../../types/generic';

export default {
  Me: (_: null, {}, context: IContext) => {
    return Controller.Me(context);
  }
};
