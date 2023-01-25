import { Request, Response } from 'express';
import { createError } from "../../utils/createError";
import { ServerResponse } from "../../constants";

const { SERVER_ERROR } = ServerResponse;

export const getUser = async (req:  Request, res: any) => {
    try {
        const user = await res.user;
        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            registerDate: user.registerDate,
            lastLoginDate: user.lastLoginDate,
            status: user.status,
        });
    } catch (err) {
        return res.status(500).send(createError(500, SERVER_ERROR));
    }
};
