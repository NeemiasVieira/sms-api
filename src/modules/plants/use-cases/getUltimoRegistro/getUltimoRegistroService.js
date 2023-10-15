import prisma from "../../../../database/prisma/prismaClient.js"
import { ErroApp } from "../../../../middlewares/erros.js";


export const getUltimoRegistroService = async(id) => {

    await prisma.$connect();

    const plantaExiste = await prisma.plantas.findUnique({where: {id}});

    if(!plantaExiste) throw new ErroApp(404, "Planta não encontrada");

    const ultimoRegistro = await prisma.registros.findFirst({where:{idPlanta: id}, orderBy: {dataDeRegistro: 'desc'}});

    await prisma.$disconnect();

    return ultimoRegistro;
}