import axios from "axios";

const API_URL = "http://localhost:3000"; // Cambia al URL de tu backend

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    return res.data; // { token, message }
  } catch (err: any) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    } else {
      throw new Error("No se pudo conectar con el servidor");
    }
  }
};


export const registerUser = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${API_URL}/auth/register`, { email, password });
    return res.data; // { message }
  } catch (err: any) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    } else {
      throw new Error("No se pudo conectar con el servidor");
    }
  }
};

