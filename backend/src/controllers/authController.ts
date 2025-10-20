import express from "express";
import { withUser } from "../utils/auth";
import User from "../models/usersModel";

const router = express.Router();

router.get("/me", withUser, async (req, res) => {
  const user = await User.findById((req as any).userId);
  res.json(user);
});

export default router;
