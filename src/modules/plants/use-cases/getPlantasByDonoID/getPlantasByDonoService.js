import { ErroApp } from "../../../../middlewares/erros.js";
import { User, Planta } from "../../../../database/prisma/schema.js";
import { isObjectId } from "../../../records/use-cases/FindAllByPlantId/findAllByPlantIdService.js";

export const getPlantasByDonoService = async (id) => {
  try {

    // Validar se o ID é válido
    if (!isObjectId(id)) throw new ErroApp(400, "ID inválido!");

    // Procurar o usuário pelo ID
    const dono = await User.findById(id);

    // Se não encontrar o usuário, retornar erro 404
    if (!dono) throw new ErroApp(404, "Não existe nenhum usuário com esse ID");

    // Procurar as plantas pelo ID do dono usando Mongoose
    const plantas = await Planta.find({ idDono: id });

    return plantas;
  } catch (error) {
    // Certifique-se de que a mensagem de erro seja registrada para análise
    console.error("Erro no serviço de obtenção de plantas por dono:", error.message);

    // Propague o erro para ser tratado no ponto de uso do serviço
    throw error;
  }
};
