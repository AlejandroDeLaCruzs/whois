import { getDb } from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { USER_COLLECTIONS } from "../utils/utils";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.SECRET as string;

type JwtPayload = {
  id: string;
  email: string;
};

const coleccion = () => getDb().collection(USER_COLLECTIONS);

export const registerService = async (email: string, password: string) => {
  const users = coleccion();

  const exists = await users.findOne({ email });
  if (exists) throw new Error("Email ya existente");

  const passEncripta = await bcrypt.hash(password, 10);
  await users.insertOne({ email, password: passEncripta });

  return { message: "Usuario creado correctamente!" };
};

export const loginService = async (email: string, password: string) => {
  const users = coleccion();

  const user = await users.findOne({ email });
  if (!user) throw new Error("email incorrecto");

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) throw new Error("contraseña incorrecta");

  const token = jwt.sign(
    { id: user._id?.toString(), email: user.email } as JwtPayload,
    SECRET,
    { expiresIn: "1h" }
  );

  return { token };
};