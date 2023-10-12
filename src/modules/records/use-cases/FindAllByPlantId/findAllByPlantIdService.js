import prisma from "../../../../database/prisma/prismaClient.js"
import { ErroApp } from "../../../../middlewares/erros.js";

export const isObjectId = (string) => {
    // Verifica se a string tem exatamente 24 caracteres hexadecimais
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    return objectIdRegex.test(string);
  }
  
export const findAllByPlantIdService = async(idPlanta) => {

    if(!isObjectId(idPlanta)){
        throw new ErroApp(400, "ID da planta é invalido");
    }

    await prisma.$connect();

    const plantaExiste = await prisma.plantas.findUnique({where:{id: idPlanta}});

    if(!plantaExiste){
        throw new ErroApp(404, "A planta não existe no banco de dados");
    }

    const registros = await prisma.registros.findMany({where:{ idPlanta }});

    await prisma.$disconnect();

    return registros;

}