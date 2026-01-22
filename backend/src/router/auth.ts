import { Router } from "express";
import { login, register } from "../controllers/users";

const authrouter = Router();

authrouter.get("/", async (req, res) => {
  res.send("Se ha conectado a la ruta de auth correctamente");
});

authrouter.post("/register", register);

authrouter.post("/login", login);

export default authrouter;
