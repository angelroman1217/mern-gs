import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://<angel>:<testing123>@web-personal.vyaut1x.mongodb.net/?retryWrites=true&w=majority&appName=web-personal`);
        console.log('DB is connected');
    } catch (error) {
        console.log(error);
    }
}