import express from "express";
import * as userControllers from "../controllers/userControllers";
import { authMiddleware } from "../middleware/authMiddleware";
import { getUserMiddleware } from "../middleware/getUserMiddleware";

const userRouter = express.Router();

userRouter.get("/", authMiddleware, userControllers.getAllUsers);
userRouter.patch(
    "/:id",
    authMiddleware,
    getUserMiddleware,
    userControllers.updateUser
);
userRouter.delete(
    "/:id",
    authMiddleware,
    getUserMiddleware,
    userControllers.deleteUser
);

export default userRouter;
