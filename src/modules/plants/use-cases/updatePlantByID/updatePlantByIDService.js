import { ErroApp } from "../../../../middlewares/erros.js";
import { Planta } from "../../../../database/prisma/schema.js";
import { isObjectId } from "../../../records/use-cases/FindAllByPlantId/findAllByPlantIdService.js";

export const updatePlantByIDService = async (id, nome, especie) => {

    // Verificar se o ID é válido
    if (!isObjectId(id)) throw new ErroApp(400, "O ID é inválido!");

    // Verificar se os campos nome e especie são fornecidos
    if (!nome || !especie) throw new ErroApp(400, "Os campos nome e especie são obrigatórios.");

    // Procurar a planta pelo ID usando Mongoose
    const plantaExiste = await Planta.findById(id);

    // Se a planta não existir, retornar erro 404
    if (!plantaExiste) throw new ErroApp(404, "Nenhuma planta encontrada");

    // Atualizar a planta com os novos valores usando Mongoose
    const plantaAtualizada = await Planta.findByIdAndUpdate(id, { nome, especie }, { new: true });

    return plantaAtualizada;

};
