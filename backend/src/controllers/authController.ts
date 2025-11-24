import express from "express";
import { withUser } from "../utils/auth";
import User from "../models/usersModel";

const router = express.Router();

router.get("/me", withUser, async (req, res) => {
  try {
    const user = await User.findById((req as any).userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ 
      user: {
        id: user.id,
        username: user.username,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router