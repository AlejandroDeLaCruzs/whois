import { getDb } from "../config/db";
import { ObjectId } from "mongodb";

const collection = () => getDb().collection("questions");

export const QuestionsModel = {
  getTodayQuestion: async () => await collection().find().toArray(),
  
};
