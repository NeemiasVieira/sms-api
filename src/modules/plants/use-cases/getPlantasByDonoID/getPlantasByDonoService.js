import prisma from "../../../../database/prisma/prismaClient.js";
import { ErroApp } from "../../../../middlewares/erros.js";
import { isObjectId } from "../../../records/use-cases/FindAllByPlantId/findAllByPlantIdService.js";

export const getPlantasByDonoService = async(id) => {

    await prisma.$connect();

    if(!isObjectId(id)) throw new ErroApp(400, "ID invalido!");

    const dono = await prisma.users.findUnique({where:{id}});

    if(!dono) throw new ErroApp(404, "Não existe nenhum usuário com esse ID");

    const plantas = await prisma.plantas.findMany({where: {idDono: id}});

    await prisma.$disconnect();

    return plantas;

}