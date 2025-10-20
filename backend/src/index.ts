import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./utils/config";
import logger from "./utils/logger";
import { requestLogger, unknownEndpoint, errorHandler } from "./utils/middleware";
import disciplinesRouter from "./routes/disciplinesRoutes";
import departmentsRouter from "./routes/departmentsRoutes";
import matchesRouter from "./routes/matchesRoutes";
import usersRouter from "./routes/usersRoutes";
import loginRouter from "./routes/loginRoutes";
import authRouter from "./routes/authRoutes";

dotenv.config();
const app = express();
app.use(cors({
  origin: "http://localhost:5173",  // puerto del frontend
  credentials: true,                // permite cookies
}));

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use("/api/disciplinas", disciplinesRouter);
app.use("/api/medalTable", departmentsRouter);
app.use("/api/puntajesPorDisciplina", matchesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/auth", authRouter);
mongoose.set("strictQuery", false);

if (config.MONGODB_URI) {
  mongoose
    .connect(config.MONGODB_URI, { dbName: config.MONGODB_DBNAME })
    .then(() => logger.info("Conectado a MongoDB"))
    .catch((error) => {
      logger.error("Error conectando a MongoDB:", error.message);
    });
}
app.get("/", (_req, res) => {
  res.send("¡Backend del torneo Interfacultades funcionando!");
});
app.use(unknownEndpoint);
app.use(errorHandler);
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
