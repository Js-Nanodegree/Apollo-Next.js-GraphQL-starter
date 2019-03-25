import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import { IUser } from '../models/user.model';

export type TObjectId = {
  _id: mongoose.Types.ObjectId;
};

interface Error {
  stack?: string;
}

export interface IReq extends Request {
  user?: IUser | null;
}

export interface IError extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
}

export interface IContext {
  req: IReq;
  res: Response;
}