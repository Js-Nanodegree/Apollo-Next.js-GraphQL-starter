import {Request, Response, NextFunction} from 'express';
import nJwt from 'njwt'
import { SIGNING_KEY } from '../config/secrets'
import User, {IUser} from '../models/user.model'
import {IReq} from '../types/generic';

export default async (req: IReq, res: Response, next: NextFunction) => {
  const token = req.cookies.token
  if (!token) {
    return next()
  }

  try {
    const verifiedJwt = nJwt.verify(token, SIGNING_KEY)
// Attach the user to the request object
    req.user = await User.findById(verifiedJwt.body.sub)
      .then((data: IUser) => {
        return data;
      });

    return next();
  } catch (error) {
    return next();
  }
}


