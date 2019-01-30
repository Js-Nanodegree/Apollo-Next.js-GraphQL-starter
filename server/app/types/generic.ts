import {Request, Response} from 'express';
import { IUser } from '../models/user.model';

export interface IReq extends Request{
    user: IUser | null;
}

export interface IContext {
    req: IReq;
    res: Response;
}