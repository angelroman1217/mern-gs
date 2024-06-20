import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import redis from "redis";
import { promisify } from "util";

const client = redis.createClient({
  legacyMode: true,
  socket: {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || 'localhost'
  }
});

await client.connect();

const ASYNC_GET = promisify(client.get).bind(client);
const ASYNC_SET = promisify(client.set).bind(client);

export const register = async (req, res) => {
  const { email, password, username } = req.body;
  try {

    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(['The email already exists']);

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({ username, email, password: passwordHash });
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id })

    res.cookie('token', token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {

    const userFound = await User.findOne({ email: email });
    if (!userFound) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

    
    const token = await createAccessToken({ id: userFound._id })
    res.cookie('token', token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const logout = (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0),
  });
  return res.sendStatus(200);
}

export const verifyToken = async(req, res) => {
  const { token } = req.cookies;

  if(!token) return res.status(401).json({"message": "User not found"});

  jwt.verify(token, TOKEN_SECRET, async(err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    
    const reply = await ASYNC_GET(user.id);
    if (reply) {
      return res.json(JSON.parse(reply));
    }

    const userFound = await User.findById(user.id).lean();
    if(!userFound) return res.status(401).json({"message": "User not found"});

    await ASYNC_SET(user.id, JSON.stringify({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    }));

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,

    })

  })
}