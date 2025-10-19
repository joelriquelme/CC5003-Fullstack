import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import mongoose from "mongoose";

dotenv.config();

const app = express();

const PORT = process.env.PORT;
const HOST = process.env.HOST || "localhost";

// middlewares
app.use(express.json());

// de prueba
app.get('/', (req, res) => {
    res.send('¡Backend del torneo Interfacultades funcionando!');
});

app.listen(Number(PORT), HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});