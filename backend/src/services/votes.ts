import { VOTES } from "../utils/utils";
import { getDb } from "../config/db";
import { ObjectId } from "mongodb";

const coleccion = () => getDb().collection(VOTES);

export const getReusltsQuestion = async (id: string) => {
  if (id.length != 24)
    return "El indice de la pregunta debe ser de 24 caracteres";

  const idExist = await coleccion().findOne({ id: new ObjectId(id) });
  if (!idExist) {
    return "no existe una pregunta con ese id";
  }

  const reusltados = coleccion().aggregate([
    { $match: { id } }, // Filtra por la pregunta del día
    { $group: { _id: "$opcion", total: { $sum: 1 } } }, // Agrupa por opción y cuenta
    { $project: { opcion: "$_id", total: 1, _id: 0 } }, // Formatea el resultado
  ]);

  return reusltados;
};
