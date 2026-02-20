import { Request, Response } from "express";
import { QuestionsModel } from "../models/questions";
import { AuthRequest } from "../middleware/auth";

export const getTodayQuestion = async (req: Request, res: Response) => {
  try {
    const question = await QuestionsModel.getTodayQuestion();
    res.status(200).send(question);
  } catch (error) {
    console.log("error");
  }
};

export const getQuestionById = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string
    const question = await QuestionsModel.getQuestionById(id);
  } catch (error) {
    console.log("error")
  }
}




