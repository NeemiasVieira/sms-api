import { ErroApp } from "../../../../middlewares/erros.js"
import prisma from "../../../../database/prisma/prismaClient.js"


export const createRecordService = async(idPlanta, nitrogenio, fosforo, potassio, umidade, temperatura, pH) => {
    if(!idPlanta || !nitrogenio || !fosforo || !potassio || !umidade || !temperatura || !pH){
        throw new ErroApp(400, "Todos os campos são obrigatórios, são eles: idPlanta, nitrogenio, fosforo, potassio, umidade, temperatura, ph");
    }

    await prisma.$connect();

    const dataDeRegistro = new Date();

    const novoRegistro = prisma.registros.create({data:{
        idPlanta,
        nitrogenio, 
        fosforo, 
        potassio, 
        umidade, 
        temperatura, 
        pH,
        dataDeRegistro
    }})

    await prisma.$disconnect();

    return novoRegistro;

}