import Controller from "../../controllers/user.controller";
import { IContext } from "../../types/generic";

export default {
  Me: (_: null, {}, context: IContext) => Controller.Me(context)
};
