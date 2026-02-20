import { ObjectId } from "mongodb";
import { getDb } from "../config/db";

const collection = () => getDb().collection("questions");

export const QuestionsModel = {
  getTodayQuestion: async () => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    return await collection().findOne({
      date: { $gte: start, $lte: end },
    });
  },

  getQuestionById: async (id: string) =>
    await collection().findOne({ _id: new ObjectId(id) }),
};
