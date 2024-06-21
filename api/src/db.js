import mongoose from "mongoose";
const DB_USER = "admin";
const DB_PASS = "admin123";
const DB_HOST = "web-personal.vyaut1x.mongodb.net";

export const connectDB = async () => {
  try {
    const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/`;
    await mongoose.connect(uri);
    console.log('DB is connected');
  } catch (error) {
    console.log(error);
  }
}