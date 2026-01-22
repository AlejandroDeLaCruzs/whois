import { Request, Response } from "express";
import { QuestionsModel } from "../models/questions";

export const getQuestion = async (req: Request, res: Response) => {
  try {
    const question = await QuestionsModel.getTodayQuestion();
    res.status(200).send(question);
  } catch (error) {
    console.log("error");
  }
};


