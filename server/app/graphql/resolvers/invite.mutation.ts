import Controller, { TinviteInput } from '../../controllers/invite.controller';
import { IContext } from '../../types/generic';

export default {
  Invite: (_: null, { input }: { input: TinviteInput }, Context: IContext) => {
    return Controller.invite({ ...input }, Context);
  }
};
