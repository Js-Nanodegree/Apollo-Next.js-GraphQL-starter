import { Request, Response } from 'express';
import { IUser } from '../models/user.model';

export interface Req extends Request {
  user: IUser;
}

export interface Context {
  req: Req;
  res: Response;
}
