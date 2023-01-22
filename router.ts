import express from "express";
import Controller from "./controller/controller";
import { check } from "express-validator";
import { authMiddleware } from "./middleware/authMiddleware";

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
router.patch("/users", authMiddleware, Controller.updateUser);
router.delete("/users", authMiddleware, Controller.deleteUser);

export default router;
