import User from "../../models/user";
import { createError } from "../../utils/createError";

export const getAllUsers = async (req: any, res: any) => {
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
        return res.status(500).send(createError(500, "Something went wrong"));
    }
};
