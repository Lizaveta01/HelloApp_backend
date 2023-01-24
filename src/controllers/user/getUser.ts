import { createError } from "../../utils/createError";

export const getUser = async (req: any, res: any) => {
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
        return res.status(500).send(createError(500, "Something went wrong"));
    }
};
