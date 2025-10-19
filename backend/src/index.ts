import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import mongoose from "mongoose";
import config from "./utils/config";
import logger from "./utils/logger";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());

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