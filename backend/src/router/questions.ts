import { Router } from "express";
import { getQuestion } from "../controllers/questions";

const questionRouter = Router();

questionRouter.get("/today", getQuestion);

export default questionRouter;


