import { DateTime } from "luxon";
import { Response, Request } from "express";
import bcrypt from "bcryptjs";

import User from "../../models/user";
import { generateAccessToken } from "../../utils/generateAccessToken";
import { createError } from "../../utils/createError";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const validationPassword = bcrypt.compareSync(password, user.password);
        if (!validationPassword) {
            return res.status(400).send(createError(401, "Password wrong"));
        }

        if (user.status === "blocked") {
            return res.status(403).send(createError(403, "User blocked"));
        }

        const dateNow = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
        user.lastLoginDate = dateNow;

        await user.save();
        const token = generateAccessToken(user._id, user.email);
        return res.json({ id: user._id, token: `Bearer ${token}` });
    } catch (err: any) {
        console.log(err);
        res.status(401).send(createError(401, "Authorization error"));
    }
};
