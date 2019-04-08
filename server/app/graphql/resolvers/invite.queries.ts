import {IContext} from 'generic';
import Controller, {
  IgetInvitesInput
} from '../../controllers/invite.controller';

export default {
  Invites: (_: null, input: IgetInvitesInput, context: IContext) => {
    return Controller.getInvites({...input}, context);
  }
};
