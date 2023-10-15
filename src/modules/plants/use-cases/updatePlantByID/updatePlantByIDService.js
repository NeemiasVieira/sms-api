import prisma from "../../../../database/prisma/prismaClient.js"
import { ErroApp } from "../../../../middlewares/erros.js";
import { isObjectId } from "../../../records/use-cases/FindAllByPlantId/findAllByPlantIdService.js";


export const updatePlantByIDService = async(id, nome, especie) => {

    if(!isObjectId(id)) throw new ErroApp(400, "O ID é invalido!");

    if(!nome, !especie) throw new ErroApp(400, "Os campos nome e especie são obrigatórios.");

    await prisma.$connect();

    const plantaExiste = await prisma.plantas.findUnique({where:{id}});

    if(!plantaExiste) throw new ErroApp(404, "Nenhuma planta encontrada");

    const plantaAtualizada = await prisma.plantas.update({where: {id}, data: {
        nome,
        especie
    }});

    await prisma.$disconnect();

    return plantaAtualizada;

    
}