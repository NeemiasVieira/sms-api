import { ErroApp } from "../../../../middlewares/erros.js";
import { Planta } from "../../../../database/prisma/schema.js";
import { isObjectId } from "../../../records/use-cases/FindAllByPlantId/findAllByPlantIdService.js";

export const deletePlantByIDService = async (id) => {
  try {
    // Validar se o ID é válido
    if (!isObjectId(id)) throw new ErroApp(400, "O ID é inválido!");

    // Procurar a planta pelo ID
    const plantaExiste = await Planta.findById(id);

    // Se não encontrar a planta, retornar erro 404
    if (!plantaExiste) throw new ErroApp(404, "Nenhuma planta encontrada");

    // Deletar a planta
    await plantaExiste.remove();

    // Você pode retornar uma mensagem ou qualquer outra informação desejada após a exclusão
    return { mensagem: "Planta excluída com sucesso" };
  } catch (error) {
    // Certifique-se de que a mensagem de erro seja registrada para análise
    console.error("Erro no serviço de exclusão de planta:", error.message);

    // Propague o erro para ser tratado no ponto de uso do serviço
    throw error;
  }
};
