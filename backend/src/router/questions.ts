import { Router } from "express";
import { getQuestionById, getTodayQuestion } from "../controllers/questions";
import { authMiddleware } from "../middleware/auth";

const questionRouter = Router();

questionRouter.get("/today", authMiddleware, getTodayQuestion);
questionRouter.get("/:id", authMiddleware, getQuestionById);

export default questionRouter;
