import userController from "../../controllers/user.controller";

export default {
  Invite: (_: null, { input }: any) => userController.invite(_, { ...input })
};
