import express from "express";
import Controller from "./controller/controller";
import { check } from "express-validator";
import { authMiddleware } from "./middleware/authMiddleware";
import { getUserMiddleware } from "./middleware/getUserMiddleware";

const router = express.Router();

//REGISTRATION / LOGINnpm 
router.post(
    "/auth/signup",
    [
        check("username", "Username can't be empty").notEmpty(),
        check("email", "Not valid email format").isEmail(),
        check("password", "Password can't be empty").notEmpty(),
    ],
    Controller.registration
);
router.post("/auth/signin",Controller.login);

router.get("/users", authMiddleware, Controller.getAllUsers);
router.patch("/users/:id", authMiddleware, getUserMiddleware, Controller.updateUser);
router.delete("/users/:id", authMiddleware, getUserMiddleware, Controller.deleteUser);

export default router;
