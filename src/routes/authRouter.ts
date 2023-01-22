import express from "express";
import * as authContollers from '../controllers/authControllers';
import { check } from "express-validator";

const authRouter = express.Router();

authRouter.post(
    "/signup",
    [
        check("username", "Username can't be empty").notEmpty(),
        check("email", "Not valid email format").isEmail(),
        check("password", "Password can't be empty").notEmpty(),
    ],
    authContollers.registration
);
authRouter.post("/signin", authContollers.login);

export default authRouter;
