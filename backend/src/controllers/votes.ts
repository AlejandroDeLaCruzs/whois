import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { VOTES } from "../utils/utils";
import { getDb } from "../config/db";

const coleccion = () => getDb().collection(VOTES);

export const voteToday = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id; 
  const { questionId, optionId } = req.body;

  const alreadyVoted = await coleccion().findOne({ userId, questionId });
  if (alreadyVoted) {
    return res.status(400).json({ error: "Already voted" });
  }

  // Guardar voto
  await coleccion().insertOne({
    userId,
    questionId,
    optionId,
    createdAt: new Date(),
  });

  res.json({ success: true });
};
