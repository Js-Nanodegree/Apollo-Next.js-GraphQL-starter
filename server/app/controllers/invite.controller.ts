import { IContext } from 'generic';
import crypto from 'crypto';
import moment from 'moment';
import { UnauthorizedRequestError } from '../controllers/errors/auth.errors';
import Invite, { IInvite } from '../models/invite.model';
import { inviteMailer } from '../mailers';
import { EmailAdreadyRegisteredError } from './errors/auth.errors';

/* Users can invite themselves to confirm their email address before registration,
 * or a user can invite another user. The workflow in either case is:
 * 1) Send email invite to the email address
 * 2) User clicks the registration link in the email
 * 3) The user is presented with a registration page
 * 4) If it is a B2B application the user can be added to the inviter's company
 * If the email is already registered, another confirmation email will be sent to the user
 */
export interface TinviteInput {
  email: string;
  message: string;
}

async function invite({ email, message }: TinviteInput, context: IContext) {
  // Check that the email doesn't already exist in the subscribe model

  const { user } = context.req;

  const sub = await Invite.findOne({ email }).exec();
  if (sub) {
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
    ? moment().diff(moment(invite.updatedAt), 'milliseconds')
    : 9e6;

  /* Only let the use send a new email every 15 minutes */
  const delayBeforeNewRequest = 15 * 60000;
  if (timeSinceLastEmail <= delayBeforeNewRequest) {
    return {
      message: `Confirmation emails can only be sent every ${delayBeforeNewRequest /
        60000} minutes.`
    };
  }

  const token = crypto.randomBytes(18).toString('hex');

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

  return Invite.create({
    email,
    token,
    message,
    inviter: user ? user._id : null
  })
    .then(data => {
      /*
       * Send a verification email to the user
       */

      // TODO Create a new mailer with the included essage when an already registered user send anther user an invite

      inviteMailer({
        email,
        _id: data._id,
        token,
        inviter: user ? user : null
      });

      return {
        message: user
          ? `An invite email has been sent to ${email}`
          : `A confirmation email as been sent to ${email}`
      };
    })
    .catch(error => {
      return error;
    });

  // Send an email with the registration link
}

/*
 * Get the invites that the requesting user has sent
 */

export interface IgetInvitesInput {
  limit: number;
  skip: number;
  sort_field: string;
  sort_order: string;
}

function getInvites(
  { limit, skip, sort_field, sort_order }: IgetInvitesInput,
  context: IContext
): Promise<IInvite[] | []> {
  const sortField = sort_field ? sort_field : 'createdAt';
  const sortOrder = sort_order === 'DEC' ? -1 : 1;

  const { user } = context.req;

  if (!user) {
    throw new UnauthorizedRequestError();
  }

  return Invite.find({ inviter: user._id })
    .sort({ [sortField]: sortOrder })
    .limit(limit || 10)
    .skip(skip || 0)
    .lean()
    .exec();
}

export default {
  invite,
  getInvites
};
