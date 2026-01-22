import express from "express";
import denotev from "dotenv";
import { connectMongoDB } from "./config/db";
//import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import { authMiddleware } from "./middleware/auth";
import authrouter from "./router/auth";
import questionRouter from "./router/questions";
import router from "./router/votes";

denotev.config();
connectMongoDB().then(() => console.log("Se ha concetado"));

const app = express();
app.use(express.json());

//app.use(cors());
app.use(errorHandler);

app.use("/auth", authrouter);

app.use(authMiddleware);

app.use("/questions", questionRouter);
app.use("/votes", router);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(process.env.PORT, () =>
  console.log("Servidor en http://localhost:3000"),
);
