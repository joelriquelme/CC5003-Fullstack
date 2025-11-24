import express from "express";
import User from "../models/usersModel";
import Department from "../models/departmentsModel";
import Discipline from "../models/disciplinesModel";
import Match from "../models/matchesModel";

const router = express.Router();

router.post("/reset", async (request, response) => {
  await User.deleteMany({});
  await Department.deleteMany({});
  await Discipline.deleteMany({});
  await Match.deleteMany({});

  response.status(204).end();
});

export default router;
