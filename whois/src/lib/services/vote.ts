import axios from "axios";
import { api } from "./api";

export const myVote = async (token: string, questionId: string) => {
  
  try {
    const res = await api.get(`/votes/myVote/${questionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    return res.data; // { message }
  } catch (error) {
    console.log(error);
  }
};

export const voteQuestion = async (
  token: string,
  questionId: string,
  optionId: string,
) => {
  const res = await api.post(
    `/votes/${questionId}`,
    { optionId },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return res.data; // { message }
};
