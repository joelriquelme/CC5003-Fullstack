import jwt from "jsonwebtoken";
import config from "./config";
import { Request, Response, NextFunction } from "express";

export const withUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ error: "missing token" });

    const decoded = jwt.verify(token, config.JWT_SECRET!);
    const csrfHeader = req.headers["x-csrf-token"];

    if (typeof decoded === "object" && decoded.csrf === csrfHeader) {
      (req as any).userId = decoded.id;
      next();
    } else {
      res.status(401).json({ error: "invalid token" });
    }
  } catch {
    res.status(401).json({ error: "invalid token" });
  }
};
