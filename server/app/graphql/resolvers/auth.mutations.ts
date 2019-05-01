import Controller, {
  ILoginInput,
  IregisterInput
} from '../../controllers/auth.controller';
import { IContext } from '../../types/generic';
const Mutation = {
  Register: (
    _: null,
    { input }: { input: IregisterInput },
    context: IContext
  ) => {
    return Controller.register({ ...input }, context);
  },
  Login: (_: null, input: ILoginInput, context: IContext) => {
    return Controller.login({ ...input }, context);
  }
};

export default Mutation;
