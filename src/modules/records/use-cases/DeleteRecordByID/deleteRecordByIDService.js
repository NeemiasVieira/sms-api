import { isObjectId } from "../FindAllByPlantId/findAllByPlantIdService.js";
import { ErroApp } from "../../../../middlewares/erros.js";
import { Registro } from "../../../../database/prisma/schema.js";

export const deleteRecordByIDService = async (id) => {

    try{

  if (id === "TODOS") {
    await Registro.deleteMany();
    return;
  }

  if (!isObjectId(id)) throw new ErroApp(400, "ID inválido");

  const registro = await Registro.findById(id);

  if (!registro) throw new ErroApp(404, "Registro não existe");

  await registro.remove();
}
catch(error){
    console.log(error)
}
};
