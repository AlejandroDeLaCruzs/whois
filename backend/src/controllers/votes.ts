import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { VOTES } from "../utils/utils";
import { getDb } from "../config/db";
import { getMyVoteById, getReusltsQuestion } from "../services/votes";

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

export const ressults = async (req: AuthRequest, res: Response) => {
  const idQuestion = req.params.id as string;

  const results = await getReusltsQuestion(idQuestion);

  res.status(200).send(results);
};



export const myVoteById = async (req: AuthRequest, res: Response) => {
  console.log("ID recibido:", req.params.id);

  const data = await getMyVoteById(req.params.id as string);
  console.log(data);

  res.status(200).send({data});
}