import prisma from "../../../../database/prisma/prismaClient.js"
import { ErroApp } from "../../../../middlewares/erros.js";
import { geraRelatorioDeSaude } from "./geraRelatorioDeSaude.js";

export const getSaudeByIdService = async(id) => {

    await prisma.$connect();

    const planta = await prisma.plantas.findUnique({where:{id}});

    if(!planta) throw new ErroApp(404, "A planta não existe");

    const ultimoRegistro = await prisma.registros.findFirst({where:{idPlanta: id}, orderBy: {dataDeRegistro: 'desc'}});

    if(!ultimoRegistro){
        throw new ErroApp(204, "A planta não possui nenhum registro");
    }

    return geraRelatorioDeSaude(ultimoRegistro);

}