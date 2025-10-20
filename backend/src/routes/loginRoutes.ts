import express from "express";
import loginController from "../controllers/loginController";

const router = express.Router();
router.use("/", loginController);
export default router;
