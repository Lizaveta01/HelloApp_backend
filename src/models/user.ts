import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    registerDate: {
        type: String,
        required: true,
    },
    lastLoginDate: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        default: "active",
    },
});

export default mongoose.model("User", userSchema);
