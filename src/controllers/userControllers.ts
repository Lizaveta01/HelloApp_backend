import User from "../models/user";
 
 export const getAllUsers = async (req: any, res: any) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export const updateUser = async (req: any, res: any) => {
    if (req.body.status !== 0) {
        res.user.status = req.body.status;
    }
    try {
        const updatedUser = await res.user.save();
        res.status(200).json({
            message: "Successfully updated",
            user: updatedUser,
        });
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export const deleteUser = async (req: any, res: any) => {
    try {
        await res.user.remove();
        res.status(200).json({ message: "Successfully deleted" });
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}