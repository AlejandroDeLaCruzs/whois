import { ObjectId } from "mongodb";
import { getDb } from "../config/db";

const collection = () => getDb().collection("questions");

export const QuestionsModel = {
  getTodayQuestion: async () =>
    await collection().findOne({
      fecha: { $eq: new Date().setHours(0, 0, 0, 0) },
    }),

  getQuestionById: async (id: string) =>
    await collection().findOne({ _id: new ObjectId(id) }),
};
