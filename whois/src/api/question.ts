import axios from "axios";

const API_URL = "http://localhost:3000"; // Cambia al URL de tu backend

export const getTodayQuestion = async (token: string) => {
  const res = await axios.get(`${API_URL}/questions/today`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // { id, text, options: [{id, text}] }
};

export const voteQuestion = async (token: string, questionId: string, optionId: string) => {
  const res = await axios.post(`${API_URL}/votes`, 
    { questionId, optionId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data; // { message }
};
