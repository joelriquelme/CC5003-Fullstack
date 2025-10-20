import { NextFunction, Request, Response } from "express";

export const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  console.log("---");
  next();
};

export const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).json({ error: "unknown endpoint" });
};

export const errorHandler = (
  error: any,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", error.message);

  if (error.name === "CastError") {
    return res.status(400).json({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};
