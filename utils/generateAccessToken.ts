import jwt from "jsonwebtoken";
import { secret } from "../config";

export const generateAccessToken = (id: {}, email: string) => {
    const payload = { id, email };
    return jwt.sign(payload, secret, { expiresIn: "24h" });
};
