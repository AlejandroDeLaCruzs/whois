import { VOTES } from "../utils/utils";
import { getDb } from "../config/db";
import { ObjectId } from "mongodb";

const coleccion = () => getDb().collection(VOTES);

export const getResultsQuestion = async (questionId: string) => {
  // ✅ Valida el ObjectId
  if (!ObjectId.isValid(questionId)) {
    throw new Error("El id de la pregunta no es válido");
  }

  // ✅ Comprueba que existen votos para esa pregunta
  const exists = await coleccion().findOne({ questionId });
  if (!exists) {
    throw new Error("No hay votos para esta pregunta");
  }

  // ✅ Agrupa por optionId y calcula porcentajes
  const resultados = await coleccion()
    .aggregate([
      { $match: { questionId } }, // filtra por questionId
      { $group: { _id: "$optionId", total: { $sum: 1 } } }, // agrupa por opción
      { $project: { optionId: "$_id", total: 1, _id: 0 } }, // formatea
    ])
    .toArray();

  // ✅ Calcula porcentajes
  const totalVotos = resultados.reduce((acc, r) => acc + r.total, 0);
  return resultados.map((r) => ({
    optionId: r.optionId,
    count: r.total,
    percentage: Math.round((r.total / totalVotos) * 100),
  }));
};


export const getMyVoteById = async (questionId: string, userId: string) => {
  const resultado = await coleccion().findOne({ questionId, userId }); // 👈 los dos
  return resultado ?? null;
};