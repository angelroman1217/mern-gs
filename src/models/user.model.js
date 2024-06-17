import mongoose from "mongoose";
const Schema = mongoose.Schema;
const collection = "Users";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },

}, {
  timestamps: true,
  versionKey: false,
  retainKeyOrder: true
});

const emp = mongoose.model(collection, UserSchema, collection);
export default emp;