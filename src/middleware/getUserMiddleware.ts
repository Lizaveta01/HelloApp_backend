import User from "../models/user";

export const getUserMiddleware = async (req: any, res: any, next: any) => {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
    res.user = user;
    next();
};
