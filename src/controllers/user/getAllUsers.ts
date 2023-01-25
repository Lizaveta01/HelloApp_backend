import User from "../../models/user";
import { createError } from "../../utils/createError";
import { Request, Response } from 'express';
import { ServerResponse } from "../../constants";

const { SERVER_ERROR } = ServerResponse;

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        const usersForResponse = users.map((user) => {
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                registerDate: user.registerDate,
                lastLoginDate: user.lastLoginDate,
                status: user.status,
            };
        });
        res.status(200).json(usersForResponse);
    } catch (err) {
        return res.status(500).send(createError(500, SERVER_ERROR));
    }
};
