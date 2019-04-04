import nJwt from 'njwt';
import { IUser } from '../models/user.model';
import { IS_DEBUG, SESSION_DURATION } from '../config/env';
import { SIGNING_KEY } from '../config/secrets';
import { DEV_URL, PROD_URL } from '../config/settings';

interface TgenerateTokenInput {
  _id: IUser['_id'];
}

function generateToken({ _id }: TgenerateTokenInput) {
  const claims = {
    iss: IS_DEBUG ? DEV_URL : PROD_URL, // The URL of your service - update paths in ../config/settings
    sub: _id // The UID of the user in your system - MongoDB _id
  };

  // This is our internal representation of the token, this is not what you'll send to your end user
  const jwt = nJwt.create(claims, SIGNING_KEY);
  jwt.setExpiration(new Date().getTime() + SESSION_DURATION);

  // Base64 URL encoded string that is safe to pass to the browser
  return jwt.compact();
}

export default generateToken;
