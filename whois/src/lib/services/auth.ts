import axios from "axios";
import { api } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await api.post(`/auth/login`, { email, password });
    const token = res.data.data.token as string;
    await AsyncStorage.setItem("token", token);
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
    const res = await axios.post(`/auth/register`, { email, password });
    return res.data; // { message }
  } catch (err: any) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message);
    } else {
      throw new Error("No se pudo conectar con el servidor");
    }
  }
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem("token"); // 🗑️ Borra el token al cerrar sesión
};

export const getToken = async () => {
  return await AsyncStorage.getItem("token"); // 👈 Recupera el token
};
