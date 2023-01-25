import { Response, Request } from 'express';
import { ServerResponse } from "../../constants";
import { createError } from "../../utils/createError";

const { USER_DELETED, SERVER_ERROR } = ServerResponse;

export const deleteUser = async (req: Request, res: any) => {
    try {
        await res.user.remove();
        res.status(200).json({ message: USER_DELETED });
    } catch (err) {
        return res.status(500).send(createError(500, SERVER_ERROR));
    }
};
