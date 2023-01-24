import { DateTime } from "luxon";
import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

import User from "../../models/user";
import { saltForHash } from "../../constants";
import { generateAccessToken } from "../../utils/generateAccessToken";
import { createError } from "../../utils/createError";

export const registration = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        const dateNow = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .send(
                    createError(400, "bad request: " + JSON.stringify(errors))
                );
        }

        const { username, email, password } = req.body;
        console.log(req.body);
        const candidate = await User.findOne({ email });
        if (candidate) {
            return res
                .status(409)
                .send(createError(409, "User already exists"));
        }

        const hashPassword = bcrypt.hashSync(password, saltForHash);
        const user = new User({
            username,
            email,
            password: hashPassword,
            registerDate: dateNow,
            lastLoginDate: dateNow,
        });
        await user.save();
        return res.json({
            message: "User created successfully",
            id: user.id,
            username: username,
            email: email,
            registerDate: dateNow,
            lastLoginDate: dateNow,
        });
    } catch (err: any) {
        console.log(err);
        res.status(401).send(createError(401, "Authorization error"));
    }
};
