import prisma from "../../../../database/prisma/prismaClient.js"
import { ErroApp } from "../../../../middlewares/erros.js";
import { isObjectId } from "../../../records/use-cases/FindAllByPlantId/findAllByPlantIdService.js";


export const deletePlantByIDService = async(id) => {

    if(!isObjectId(id)) throw new ErroApp(400, "O ID é invalido!");

    await prisma.$connect();

    const plantaExiste = await prisma.plantas.findUnique({where:{id}});

    if(!plantaExiste) throw new ErroApp(404, "Nenhuma planta encontrada");

    await prisma.plantas.delete({where:{id}});

    await prisma.$disconnect();

}