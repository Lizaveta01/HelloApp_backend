import User from '../models/user';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/interfaces';
import { ServerResponse } from '../constants';

const { SERVER_ERROR, USER_NOT_FOUND } = ServerResponse;

export const getUserMiddleware = async (req: Request, res: any, next: NextFunction) => {
    let user: IUser | null;
    try {
        user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: USER_NOT_FOUND });
        }
    } catch (err) {
        return res.status(500).json({ message: SERVER_ERROR });
    }
    res.user = user;
    next();
};
