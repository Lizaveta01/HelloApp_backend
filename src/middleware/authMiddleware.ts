import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { secret } from '../constants';
import { ServerResponse } from '../constants';

const { AUTH_ERROR } = ServerResponse;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const token = req.headers.authorization!.split(' ')[1];
        if (!token) {
            throw new Error();
        }
        const decodedData = jwt.verify(token, secret);
        if (decodedData) {
            next();
        }
    } catch (err) {
        return res.status(403).json({ message: AUTH_ERROR });
    }
};
