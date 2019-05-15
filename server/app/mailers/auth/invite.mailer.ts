import path from 'path';
import { IUser } from '../../models/user.model';
import { IInvite } from '../../models/invite.model';
import { IS_DEBUG } from '../../config/env';
import {
  SYSTEM_EMAIL_ADDRESS,
  DEBUG_EMAIL_ADDRESS,
  DEV_URL,
  PROD_URL
} from '../../config/settings';
import sendEmail from '../helpers/sendEmail';
import renderTemplate from '../helpers/renderTemplate';

interface IinviteMailerInput {
  email: IUser['email'];
  _id: IInvite['_id'];
  token: IInvite['token'];
  inviter?: IUser | null;
}

export default async ({ email, _id, token, inviter }: IinviteMailerInput) => {
  const template = path.join(__dirname, '../templates/subscribe.template.ejs');

  const URL = IS_DEBUG ? DEV_URL : PROD_URL;

  const params = {
    _id,
    token,
    URL,
    inviter
  };

  const html = await renderTemplate({ template, params })
    .then(result => {
      return result;
    })
    .catch(error => {
      throw error;
    });

  if (!html) {
    return Error('Email HTML could not be rendered');
  }

  const data = {
    from: SYSTEM_EMAIL_ADDRESS,
    to: IS_DEBUG ? DEBUG_EMAIL_ADDRESS : email,
    subject: 'Please confirm your email address',
    html
  };

  return sendEmail(data);
};
