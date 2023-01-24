import express from "express";

import { deleteUser } from "../controllers/user/deleteUser";
import { getAllUsers } from "../controllers/user/getAllUsers";
import { getUser } from "../controllers/user/getUser";
import { updateUser } from "../controllers/user/updateUser";
import { authMiddleware } from "../middleware/authMiddleware";
import { getUserMiddleware } from "../middleware/getUserMiddleware";

const userRouter = express.Router();

userRouter.get("/", authMiddleware, getAllUsers);

userRouter.get(
    "/:id",
    authMiddleware,
    getUserMiddleware,
    getUser
);

userRouter.patch(
    "/:id",
    authMiddleware,
    getUserMiddleware,
    updateUser
);
userRouter.delete(
    "/:id",
    authMiddleware,
    getUserMiddleware,
    deleteUser
);

export default userRouter;
