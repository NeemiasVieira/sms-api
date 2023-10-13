import { MyDate } from "../../../../assets/DateSaoPaulo.js";
import prisma from "../../../../database/prisma/prismaClient.js"
import { ErroApp } from "../../../../middlewares/erros.js";

export const createPlantService = async(idDono, nome, especie) => {
    await prisma.$connect();

    if(!especie) throw new ErroApp(400, "O campo espécie da planta é obrigatório!");
    if(!idDono) throw new ErroApp(400, "O campo idDono é obrigatório!");
    if(idDono.length !== 24) throw new ErroApp(400, "O ID do dono da planta é invalido");
    
    const dono = await prisma.users.findUnique({where:{id: idDono}});
    if(!dono) throw new ErroApp(400, "Usuário (Dono) não existe");

    const dataDaPlantacao = new MyDate();

    const newPlant = await prisma.plantas.create({data:{
        idDono,
        nome,
        especie,
        dataDaPlantacao
    }})

    return newPlant;
}