
import { api } from "./api";



export const getTodayQuestion = async (token: string) => {
  const res = await api.get(`/questions/today`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  return res.data; // { id, text, options: [{id, text}] }
};




