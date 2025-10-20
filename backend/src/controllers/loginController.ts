import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/usersModel";
import config from "../utils/config";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ error: "invalid username or password" });

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!passwordCorrect) return res.status(401).json({ error: "invalid username or password" });

  const csrf = crypto.randomUUID();
  const token = jwt.sign(
    { username: user.username, id: user._id, csrf },
    config.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.setHeader("X-CSRF-Token", csrf);
  res.status(200).json({ username: user.username, name: user.name });
});

export default router;
