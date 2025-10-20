import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import config from "./utils/config";
import logger from "./utils/logger";
import disciplinesRouter from './routes/disciplinesRoutes'; 
import departmentsRouter from './routes/departmentsRoutes'; 
import matchesRouter from './routes/matchesRoutes';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/disciplinas', disciplinesRouter);
app.use('/api/medalTable', departmentsRouter);
app.use('/api/puntajesPorDisciplina', matchesRouter);


mongoose.set("strictQuery", false);

if (config.MONGODB_URI) {
  mongoose.connect(config.MONGODB_URI, { dbName: config.MONGODB_DBNAME }).catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });
}

// de prueba
app.get('/', (req, res) => {
    res.send('¡Backend del torneo Interfacultades funcionando!');
});

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});