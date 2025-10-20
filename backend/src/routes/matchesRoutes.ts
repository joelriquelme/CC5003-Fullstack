import { Router } from "express";
import { getStandings, create, getAll } from "../controllers/matchControllers";

const router = Router();

router.get("/", getStandings);  
router.post("/", create);

export default router;
