import axios from "axios";

const API_URL = "http://localhost:3000";


export const myVote = async (token: string, questionId: string) => {
  const res = await axios.post(`${API_URL}/votes/myVote/:${questionId}`, 
    { questionId},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data; // { message }
};

export const voteQuestion = async (token: string, questionId: string, optionId: string) => {
  const res = await axios.post(`${API_URL}/votes`, 
    { questionId, optionId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data; // { message }
};