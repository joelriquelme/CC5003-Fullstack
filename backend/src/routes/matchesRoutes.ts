import { Router } from "express";
import { getStandings, create, getAll, createStanding } from "../controllers/matchControllers";

const router = Router();

router.get("/", getStandings);  
router.post("/", createStanding); 

export default router;