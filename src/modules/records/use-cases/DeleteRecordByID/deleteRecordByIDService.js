import { isObjectId } from "../FindAllByPlantId/findAllByPlantIdService.js"
import { ErroApp } from "../../../../middlewares/erros.js";
import prisma from "../../../../database/prisma/prismaClient.js"

export const deleteRecordByIDService = async(id) => {

    await prisma.$connect();

    if(id === "TODOS"){
        await prisma.registros.deleteMany();
        return;
    }

    if(!isObjectId(id)) throw new ErroApp(400, "ID invalido");

    const registro = await prisma.registros.findUnique({where:{id}});

    if(!registro) throw new ErroApp(404, "Registro não existe");

    await prisma.registros.delete({where: {id}});    
    
    await prisma.$disconnect();    
}