import { MyDate } from "../../../../assets/DateSaoPaulo.js";
import { Planta, User } from "../../../../database/prisma/schema.js";
import { ErroApp } from "../../../../middlewares/erros.js";

export const createPlantService = async (idDono, nome, especie) => {
  try {
    // Validar parâmetros
    if (!especie) throw new ErroApp(400, "O campo espécie da planta é obrigatório!");
    if (!idDono) throw new ErroApp(400, "O campo idDono é obrigatório!");
    if (idDono.length !== 24) throw new ErroApp(400, "O ID do dono da planta é inválido");

    // Verificar se o usuário (dono) existe
    const dono = await User.findById(idDono);
    if (!dono) throw new ErroApp(400, "Usuário (Dono) não existe");

    // Criar a data de plantação
    const dataDaPlantacao = new Date();

    // Criar a nova planta usando Mongoose
    const newPlant = await Planta.create({
      idDono,
      nome,
      especie,
      dataDaPlantacao,
    });

    return newPlant;
  } catch (error) {
    // Certifique-se de que a mensagem de erro seja registrada para análise
    console.error("Erro no serviço de criação de planta:", error.message);

    // Propague o erro para ser tratado no ponto de uso do serviço
    throw error;
  }
};
