import { Request, Response } from 'express';
import { createError } from "../../utils/createError";
import { ServerResponse } from "../../constants";

const { SERVER_ERROR, USER_UPDATED } = ServerResponse;

export const updateUser = async (req:Request, res: any ) => {
    
    if (req.body.status) {
        res.user.status = req.body.status;
    }
    if (req.body.lastLoginDate) {
        res.user.lastLoginDate = req.body.lastLoginDate;
    }
    try {
        const updatedUser = await res.user.save();
        res.status(200).json({
            message: USER_UPDATED,
            user: updatedUser,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send(createError(500, SERVER_ERROR));
    }
};
