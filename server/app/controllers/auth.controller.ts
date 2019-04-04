import {
  InvalidEmailPasswordError,
  MissingRequiredFieldsError,
  NoUserError
} from './errors/auth.errors';
import { SESSION_DURATION } from '../config/env';
import Invite from '../models/invite.model';
import User from '../models/user.model';
import { IContext } from '../types/generic';
import generateToken from '../utils/generateToken';

export interface ISubscribeInput {
  email: string;
}

export default {
  register,
  login
};

type TdeactivateInviteTokenInput = {
  email: string;
};

function deactivateSubscribeToken({ email }: TdeactivateInviteTokenInput) {
  return Invite.findOneAndUpdate(
    { email },
    {
      $set: {
        active: false
      }
    }
  )
    .then(() => {
      return true;
    })
    .catch((error: Error) => {
      return error;
    });
}
type TregisterInput = {
  inviteToken: string;
  firstName: string;
  lastName: string;
  _id: string;
  password: string;
  passwordRepeat: string;
};

async function register(
  {
    inviteToken,
    firstName,
    lastName,
    _id,
    password,
    passwordRepeat
  }: TregisterInput,
  context: IContext
): Promise<any> {
  if (password !== passwordRepeat) {
    return Error('Passwords do not match');
  }
  if (!firstName || !lastName || !password || !passwordRepeat) {
    throw new MissingRequiredFieldsError({
      data: {
        missing: {
          firstName: !firstName,
          lastName: !lastName,
          password: !password,
          passwordRepeat: !passwordRepeat
        }
      }
    });
  }

  const invite = await Invite.findById(_id)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });

  if (!invite) {
    return Error("You don't exist.");
  }

  if (!invite.active) {
    return Error('You have already registered. Please login.');
  }

  // Check the subscribeToken to make sure it is valid
  if (invite.token !== inviteToken) {
    return Error('Invalid token.');
  }

  // Make sure you already use create here so the password is hashed with Mongoose's pre save middleware
  return User.create({
    email: invite.email,
    firstName,
    lastName,
    password
  })
    .then(async user => {
      const _id = user._id;
      const token = await generateToken({ _id });

      // Change the active param to false on the subscribe token
      deactivateSubscribeToken({ email: user.email });

      // Set the token in a cookie
      context.res.cookie('token', token, { maxAge: 3.154e10, httpOnly: true });

      return { token, message: 'Successfully registered' };
    })
    .catch(error => {
      return error;
    });
}

async function login(
  {
    email,
    password
  }: {
    email: string;
    password: string;
  },
  context: IContext
) {
  const user = await User.findOne({ email })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log({ error });
      throw error;
    });

  if (!user) {
    throw new NoUserError({
      data: {
        email
      }
    });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new InvalidEmailPasswordError();
  }

  const token = await generateToken({ _id: user._id });

  context.res.cookie('token', token, {
    maxAge: SESSION_DURATION,
    httpOnly: true
  });

  return { token };
}
