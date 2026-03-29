import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { VOTES } from "../utils/utils";
import { getDb } from "../config/db";
import { getMyVoteById, getResultsQuestion } from "../services/votes";

const coleccion = () => getDb().collection(VOTES);

export const voteToday = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { optionId } = req.body;
    const { questionId } = req.params;
    console.log("usuario antes de votar", userId);

    // ✅ Comprueba si ya votó
    const alreadyVoted = await coleccion().findOne({ userId, questionId });
    if (alreadyVoted) {
      return res.status(400).json({ message: "Ya has votado hoy" });
    }

    // ✅ Guarda el voto
    await coleccion().insertOne({
      userId,
      questionId,
      optionId,
      createdAt: new Date(),
    });

    // ✅ Devuelve los resultados tras votar
    const results = await getResultsQuestion(String(questionId));
    res.status(201).json({ success: true, results }); // 👈 devuelve results al front
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const ressults = async (req: AuthRequest, res: Response) => {
  const idQuestion = req.params.id as string;

  const results = await getResultsQuestion(idQuestion);

  res.status(200).send(results);
};

export const myVoteById = async (req: AuthRequest, res: Response) => {
  try {
    const questionId = req.params.id;
    const userId = req.user?.id; 

    const data = await getMyVoteById(String(questionId), userId as string);

    if (!data) {
      return res.status(200).json({ hasVoted: false });
    }

    const results = await getResultsQuestion(String(questionId));
    res.status(200).json({ hasVoted: true, optionId: data.optionId, results });

  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};