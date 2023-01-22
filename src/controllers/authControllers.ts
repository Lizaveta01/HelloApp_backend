
import { Response, Request } from 'express';
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

import User from "../models/user";
import { saltForHash } from "../constants";
import { generateAccessToken } from "../utils/generateAccessToken";

export const registration = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Registration error" });
        }

        const { username, email, password } = req.body;
        const candidate = await User.findOne({ email });
        if (candidate) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashPassword = bcrypt.hashSync(password, saltForHash);
        const user = new User({ username, email, password: hashPassword });
        await user.save();
        return res.json({
            message: "User created successfully",
            username: username,
            email: email,
        });
    } catch (err: any) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const validationPassword = bcrypt.compareSync(password, user.password);
        if (!validationPassword) {
            return res.status(400).json({ message: "Password wrong" });
        }

        const token = generateAccessToken(user._id, user.email);
        return res.json({ email: email, token: `Bearer ${token}` });
    } catch (err: any) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};
