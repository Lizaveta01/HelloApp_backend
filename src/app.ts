import mongoose from "mongoose";
import { port } from "./constants";
import * as serverService from "./services/server";

const PORT = process.env.PORT || port;

(async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://Lizaveta:Lizaveta@cluster0.fpbrnba.mongodb.net/?retryWrites=true&w=majority"
        );
        serverService.server.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
})();

process.on("SIGINT", async () => {
    await mongoose.disconnect();
    process.exit();
});
