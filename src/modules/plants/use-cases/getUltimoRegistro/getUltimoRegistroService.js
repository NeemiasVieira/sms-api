import { ErroApp } from "../../../../middlewares/erros.js";
import { Planta, Registro } from "../../../../database/prisma/schema.js";

export const getUltimoRegistroService = async (id) => {

    // Verificar se a planta existe usando Mongoose
    const plantaExiste = await Planta.findById(id);

    // Se a planta não existir, retornar erro 404
    if (!plantaExiste) throw new ErroApp(404, "Planta não encontrada");

    // Procurar o último registro da planta usando Mongoose
    const ultimoRegistro = await Registro.findOne({ idPlanta: id }).sort({ dataDeRegistro: 'desc' });

    if(!ultimoRegistro) throw new ErroApp(404, "A planta não possui registros!")

    return ultimoRegistro;
  } 

