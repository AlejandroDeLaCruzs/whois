import { Request, Response } from "express";
import { registerService, loginService } from "../services/users";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const result = await registerService(email, password);
    res.status(201).json(result);
  } catch (err: any) {
    const status = err.message === "Email ya existente" ? 400 : 500;
    res.status(status).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const result = await loginService(email, password);
    res.status(200).json({ data: result, success: true });
  } catch (err: any) {
    const status =
      err.message.includes("incorrecto") || err.message.includes("incorrecta")
        ? 404
        : 500;
    res.status(status).json({ message: err.message });
  }
};
