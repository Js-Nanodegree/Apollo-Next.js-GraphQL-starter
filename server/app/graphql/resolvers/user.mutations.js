import userController from '../../controllers/user.controller';

export default {
  Invite: (_, { input }, content) =>
    userController.invite(_, { ...input }, content)
};
