import prisma from "../../../../database/prisma/prismaClient.js"
import { ErroApp } from "../../../../middlewares/erros.js"
import { isObjectId } from "../FindAllByPlantId/findAllByPlantIdService.js"

export const updateRecordByIDService = async(id, nitrogenio, fosforo, potassio, umidade, temperatura, pH ) => {

    if(!isObjectId(id)) throw new ErroApp(400, "ID invalido!");

    await prisma.$connect();

    const registro = await prisma.registros.findUnique({where:{id}});

    if(!registro) throw new ErroApp(404, "Registro não encontrado");

    const registroAtualizado = await prisma.registros.update({where: {id}, data: {
        nitrogenio, fosforo, potassio, umidade, temperatura, pH
    }})

    await prisma.$disconnect();

    return registroAtualizado;

}