import express from "express";
import { check } from "express-validator";
import { login } from "../controllers/authorization/login";
import { registration } from "../controllers/authorization/registration";

const authRouter = express.Router();

authRouter.post(
    "/signup",
    [
        check("username", "Username can't be empty").notEmpty(),
        check("email", "Not valid email format").isEmail(),
        check("password", "Password can't be empty").notEmpty(),
    ],
    registration
);
authRouter.post("/signin", login);

export default authRouter;
