import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import authRouter from "../routes/authRouter";
import userRouter from "../routes/userRouter";

export const app = express();

export const server = http.createServer(app);
export const socket = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/users", userRouter);
app.use("/auth", authRouter);
