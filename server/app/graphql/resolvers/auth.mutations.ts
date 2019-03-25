import Controller from "../../controllers/auth.controller";
import { IContext } from "../../types/generic";
export default {
  /* The subscribe function should be replaced with the invite function so it can be reused
   for users inviting themselves and users inviting others from their company */
  // Subscribe: (_: null, { input }: any) => {
  //   return Controller.subscribe({ ...input });
  // },
  Register: (_: null, { input }: any, context: IContext) => {
    return Controller.register({ ...input }, context);
  },
  Login: (_: null, { input }: any, context: IContext) => {
    return Controller.login({ ...input }, context);
  }
};
