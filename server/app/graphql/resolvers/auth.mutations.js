import AuthController from '../../controllers/auth.controller'

export default {
  Subscribe: (_, {input}, context) => {
    return AuthController.subscribe(_, {...input}, context)
  },
  Register: (_, {input}, context) => {
    return AuthController.register(_, {...input}, context)
  },
  Login: (_, {input}, context) => {
    return AuthController.login(_, {...input}, context)
  },
  // GitHubAuth: (_, {input}, context) => {
  //     return AuthController.gitHubAuth(_, {...input}, context)
  // },
}
