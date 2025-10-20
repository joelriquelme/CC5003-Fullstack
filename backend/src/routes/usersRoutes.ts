import express from "express";
import usersController from "../controllers/usersController";

const router = express.Router();

router.use("/", usersController);

export default router;
