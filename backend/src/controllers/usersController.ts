import bcrypt from "bcrypt";
import express from "express";
import User from "../models/usersModel";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { username, name, password } = req.body;
    if (!password || password.length < 3)
      return res.status(400).json({ error: "password too short" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ username, name, passwordHash });
    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

export default router;
