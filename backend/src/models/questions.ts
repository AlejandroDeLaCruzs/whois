import { ObjectId } from "mongodb";
import { getDb } from "../config/db";

const collection = () => getDb().collection("questions");

export const QuestionsModel = {
  getTodayQuestion: async () => {
    const now = new Date();

    // ✅ Usa UTC para evitar problemas de zona horaria
    const start = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        0,
        0,
        0,
        0,
      ),
    );

    const end = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        23,
        59,
        59,
        999,
      ),
    );

   

    return await collection().findOne({
      date: { $gte: start, $lte: end },
    });
  },

  getQuestionById: async (id: string) =>
    await collection().findOne({ _id: new ObjectId(id) }),
};
