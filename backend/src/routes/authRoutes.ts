import express from "express";
import authController from "../controllers/authController";

const router = express.Router();
router.use("/", authController);
export default router;
