import Controller from '../../controllers/auth.controller';
import { IContext } from '../../types/generic';
export default {
  Register: (_: null, { input }: any, context: IContext) => {
    return Controller.register({ ...input }, context);
  },
  Login: (_: null, { input }: any, context: IContext) => {
    return Controller.login({ ...input }, context);
  }
};
