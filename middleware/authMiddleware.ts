import jwt from "jsonwebtoken";
import { secret } from "../config";

export const authMiddleware = (req: any, res: any, next: any) => {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token) {
            return res.status(403).json({ message: "User is not authorized" });
        }
        const decodedData = jwt.verify(token, secret);
        req.user = decodedData;
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({ message: "User is not authorized" });
    }
};
