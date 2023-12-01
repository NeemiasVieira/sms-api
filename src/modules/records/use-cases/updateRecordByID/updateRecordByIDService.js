import { ErroApp } from "../../../../middlewares/erros.js";
import { Registro } from "../../../../database/prisma/schema.js";
import { isObjectId } from "../FindAllByPlantId/findAllByPlantIdService.js";

export const updateRecordByIDService = async (
  id,
  nitrogenio,
  fosforo,
  potassio,
  umidade,
  temperatura,
  pH
) => {

  if (!isObjectId(id)) throw new ErroApp(400, "ID inválido!");


  const registro = await Registro.findById(id);


  if (!registro) throw new ErroApp(404, "Registro não encontrado");


  const registroAtualizado = await Registro.findByIdAndUpdate(
    id,
    { nitrogenio, fosforo, potassio, umidade, temperatura, pH },
    { new: true }
  );

  return registroAtualizado;
};
