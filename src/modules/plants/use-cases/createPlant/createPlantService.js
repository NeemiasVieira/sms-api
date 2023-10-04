import prisma from "../../../../database/prisma/prismaClient.js"
import { ErroApp } from "../../../../middlewares/erros.js";

export const createPlantService = async(especie) => {
    await prisma.$connect();

    if(!especie){
        throw new ErroApp(400, "O campo espécie da planta é obrigatório!")
    }

    const dataDaPlantacao = new Date();

    const newPlant = await prisma.plantas.create({data:{
        especie,
        dataDaPlantacao
    }})

    return newPlant;
}