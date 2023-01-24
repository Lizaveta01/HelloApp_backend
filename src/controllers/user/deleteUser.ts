import { createError } from "../../utils/createError";

export const deleteUser = async (req: any, res: any) => {
    try {
        await res.user.remove();
        res.status(200).json({ message: "Successfully deleted" });
    } catch (err) {
        return res.status(500).send(createError(500, "Something went wrong"));
    }
};
