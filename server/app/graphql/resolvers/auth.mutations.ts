import Controller from "../../controllers/auth.controller";
import { IContext } from "../../types/generic";
import { Context } from "apollo-server-core";

export default {
  Subscribe: (_: null, { input }: any) => {
    return Controller.subscribe(_, { ...input });
  },
  Register: (_: null, { input }: any, context: IContext) => {
    return Controller.register(_, { ...input }, context);
  },
  Login: (_: null, { input }: any, context: Context) => {
    return Controller.login({ ...input }, context);
  }
};
