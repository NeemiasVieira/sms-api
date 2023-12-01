import { ErroApp } from "../../../../middlewares/erros.js";
import { Planta, Registro } from "../../../../database/prisma/schema.js";
import { geraRelatorioDeSaude } from "./geraRelatorioDeSaude.js";

export const getSaudeByIdService = async (id) => {

    const planta = await Planta.findById(id);

    if (!planta) throw new ErroApp(404, "A planta não existe");

    const ultimoRegistro = await Registro.findOne({ idPlanta: id }).sort({ dataDeRegistro: 'desc' });

    if (!ultimoRegistro) {
      throw new ErroApp(204, "A planta não possui nenhum registro");
    }

    return geraRelatorioDeSaude(ultimoRegistro);
  } 

