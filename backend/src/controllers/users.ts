import { Request, Response, Router } from "express";
import { connectMongoDB, getDb } from "../config/db";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { USER_COLLECTIONS } from "../utils/utils";

dotenv.config();

const SECRET = process.env.SECRET;

type JwtPayload = {
  id: string;
  email: string;
};

const coleccion = () => getDb().collection(USER_COLLECTIONS);

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const users = coleccion();

    const exists = await users.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email ya existente" });
    }

    const passEncripta = await bcrypt.hash(password, 10);
    await users.insertOne({ email, password: passEncripta });

    res.status(201).json({ message: "Usuario creado correctamente!" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    const users = coleccion();

    const user = await users.findOne({ email });
    if (!user) return res.status(404).json({ message: "email incorrecto" });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return res.status(404).json({ message: "contraseña incorrecta" });

    const token = jwt.sign(
      { id: user._id?.toString(), email: user.email } as JwtPayload,
      SECRET as string,
      {
        expiresIn: "1h",
      },
    );
    res.status(200).json({data: {token }, success: true});
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
