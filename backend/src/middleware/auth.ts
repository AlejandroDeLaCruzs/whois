import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.SECRET as string;

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Token requerido" });
  }

  const token = authHeader.split(" ")[1]; // Bearer TOKEN

  try {
    console.log(token);
    const decoded = jwt.verify(token, SECRET) as {
      id: string;
      email: string;
    };

    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
