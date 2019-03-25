import crypto from "crypto";
import moment from 'moment';
import User from "../models/user.model";
import Invite, {IInvite} from "../models/invite.model";
import { IContext } from "../types/generic";
import { inviteMailer } from "../mailers";
import {
  EmailAdreadyRegisteredError
} from "./errors/auth.errors";

function Me(context: IContext) {
  return context.req.user;
}

export type TinviteInput = {
  email: string;
  message: string;
};

/* Users can invite themselves to confirm their email address before registration, 
* or a user can invite another user. The workflow in either case is:
* 1) Send email invite to the email address
* 2) User clicks the registration link in the email
* 3) The user is presented with a registration page
* 4) If it is a B2B application the user can be added to the inviter's company
* If the email is already registered, another confirmation email will be sent to the user
*/
async function invite({ email, message }: TinviteInput, context: IContext) {
  // Check that the email doesn't already exist in the subscribe model

  const {user} = context.req;

  const sub = await Invite.findOne({email}).exec();
  if(sub){
    throw new Error('That email has already been invited');
  }

  /* Get the invite to run various checks on it */
  const invite = await Invite.findOne({ email })
  .then((data: IInvite | null) => {
    return data;
  })
  .catch((error: Error) => {
    throw error;
  });


  /* If the invite isn't active the user has probanly already registered */
  if (invite && !invite.active) {
    throw new EmailAdreadyRegisteredError({
      data: {
        email
      }
    });
  }

  /* Get the time since they last sent an email confirmation */
const timeSinceLastEmail = invite
  ? moment().diff(moment(invite.updatedAt), "milliseconds")
  : 9e6;

/* Only let the use send a new email every 15 minutes */
const delayBeforeNewRequest = 15 * 60000;
if (timeSinceLastEmail <= delayBeforeNewRequest) {
  return {
    message: `Confirmation emails can only be sent every ${delayBeforeNewRequest /
      60000} minutes.`
  };
}

const token = crypto.randomBytes(18).toString("hex");

if (invite) {
  return Invite.findOneAndUpdate({ _id: invite._id }, { token })
    .then(() => {
      inviteMailer({ email, _id: invite._id, token });

      return {
        message: `A new confirmation email has been sent to ${email}`
      };
    })
    .catch(error => {
      throw error;
    });
}

return Invite.create({ email, token, message, inviter: user ? user._id : null })
  .then(data => {
    // Send a verification email to the user
    inviteMailer({ email, _id: data._id, token, inviter: user ? user : null });

    return { message: user ? `An invite email has been sent to ${email}` : `A confirmation email as been sent to ${email}` };
  })
  .catch(error => {
    return error;
  });

  // Send an email with the registration link
}

async function Users(_: null, {}) {
  const users = await User.find()
    .select("-password")
    .lean()
    .exec();

  return {
    count: users.length,
    nodes: users,
    message: "Successfully queried users"
  };
}

export default {
  Me,
  invite,
  Users
};
