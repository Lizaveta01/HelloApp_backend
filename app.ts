import express from "express";
import mongoose from "mongoose";
import router from './router';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use('/', router);

mongoose.set("strictQuery", false);

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://Lizaveta:Lizaveta@cluster0.fpbrnba.mongodb.net/?retryWrites=true&w=majority');
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
};

start();
