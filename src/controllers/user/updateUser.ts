import { createError } from "../../utils/createError";

export const updateUser = async (req: any, res: any) => {
    console.log(req.body);
    if (req.body.status) {
        res.user.status = req.body.status;
    }
    if (req.body.lastLoginDate) {
        res.user.lastLoginDate = req.body.lastLoginDate;
    }
    try {
        const updatedUser = await res.user.save();
        res.status(200).json({
            message: "Successfully updated",
            user: updatedUser,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send(createError(500, "Something went wrong"));
    }
};
