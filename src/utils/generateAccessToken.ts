import jwt from "jsonwebtoken";
import { secret } from "../constants";

export const generateAccessToken = (id: {}, email: string) => {
    const payload = { id, email };
    return jwt.sign(payload, secret, { expiresIn: "24h" });
};
