import { Response, NextFunction } from 'express';
import nJwt from 'njwt';
import { SIGNING_KEY } from '../config/secrets';
import User, { IUser } from '../models/user.model';
import { IReq } from '../types/generic';

export const verify = ({
  token,
  SIGNING_KEY
}: {
  token: string;
  SIGNING_KEY: string;
}) => {
  return nJwt.verify(token, SIGNING_KEY);
};

export default async (req: IReq, res: Response, next: NextFunction) => {
  if (!SIGNING_KEY) {
    throw new Error(
      'The SIGNING_KEY is a required property. Please configure it in your .env file'
    );
  }
  const token = req.cookies.token;
  if (!token) {
    return next();
  }

  try {
    const verifiedJwt = verify({ token, SIGNING_KEY });
    // Attach the user to the request object
    req.user = await User.findById(verifiedJwt.body.sub).then(
      (data: IUser | null) => {
        return data;
      }
    );

    return next();
  } catch (error) {
    return next();
  }
};
