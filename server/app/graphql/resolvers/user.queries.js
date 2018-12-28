import userController from '../../controllers/user.controller';

export default {
    Me: (_, {}, content) =>
        userController.Me(_, {}, content),
    Users: (_, { }, content) =>
        userController.Users(_, {}, content),
}
