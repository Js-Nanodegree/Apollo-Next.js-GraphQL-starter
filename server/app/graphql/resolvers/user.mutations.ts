import Controller, {TinviteInput} from "../../controllers/user.controller";
import { IContext } from "../../types/generic";

export default {
  Invite: (_: null, { input }: {input: TinviteInput}, Context: IContext) => Controller.invite({ ...input }, Context)
};
