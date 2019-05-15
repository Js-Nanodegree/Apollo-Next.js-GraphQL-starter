import path from 'path';
import ejs from 'ejs-promise';
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

interface IinviteMailerInput {
  email: IUser['email'];
  _id: IInvite['_id'];
  token: IInvite['token'];
  inviter?: IUser | null;
}

export default async ({ email, _id, token, inviter }: IinviteMailerInput) => {
  const template = path.join(__dirname, '../templates/subscribe.template.ejs');

  const URL = IS_DEBUG ? DEV_URL : PROD_URL;

  // TODO generating emails should be modularised
  const html = await ejs.renderFile(
    template,
    {
      _id,
      token,
      URL,
      inviter
    },
    {},
    /*eslint-disable-next-line */
    function(err: Error, resultPromise: any) {
      if (err) {
        return err;
      }
      return resultPromise
        .then(function(result: string) {
          return result;
        })
        .catch((error: Error) => {
          throw error;
        });
    }
  );

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
