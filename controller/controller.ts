import User from "../models/user";
import bcrypt from "bcryptjs";
import { saltForHash } from "../models/constants";
import { validationResult } from "express-validator";
import { generateAccessToken } from "../utils/generateAccessToken";

class Controller {
    async registration(req: any, res: any) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Registration error" });
            }

            const { username, email, password } = req.body;
            const candidate = await User.findOne({ email });
            if (candidate) {
                return res.status(400).json({ message: "User already exists" });
            }

            const hashPassword = bcrypt.hashSync(password, saltForHash);
            const user = new User({ username, email, password: hashPassword });
            await user.save();
            return res.json({ message: "User created successfully" });
        } catch (err: any) {
            console.log(err);
            res.status(400).json({ message: err.message });
        }
    }

    async login(req: any, res: any) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const validationPassword = bcrypt.compareSync(
                password,
                user.password
            );
            if (!validationPassword) {
                return res.status(400).json({ message: "Password wrong" });
            }

            const token = generateAccessToken(user._id, user.email);
            return res.json({ token: `Bearer ${token}` });
        } catch (err: any) {
            console.log(err);
            res.status(400).json({ message: err.message });
        }
    }

    async getAllUsers(req: any, res: any) {
        try {
            const users = await User.find();
            res.json(users);

        } catch (err) {}
    }

    async updateUser(req: any, res: any) {
        try {
        } catch (err) {}
    }

    async deleteUser(req: any, res: any) {
        try {
        } catch (err) {}
    }
}

export default new Controller();
