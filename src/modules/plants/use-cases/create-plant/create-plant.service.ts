import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import prisma from 'src/database/prisma/prisma-client';
import { Plant } from '../../plant.type';

@Injectable()
export class CreatePlantService {
    async createPlant(idDono: string, nome: string, especie: string): Promise<Plant>{

    await prisma.$connect();

    if(idDono.length !== 24) throw new GraphQLError("O ID do dono da planta é invalido");
    
    const dono = await prisma.users.findUnique({where:{id: idDono}});

    if(!dono) throw new GraphQLError("Usuário (Dono) não existe");

    const dataDaPlantacao = new Date();

    const newPlant = await prisma.plantas.create({data:{
        idDono,
        nome,
        especie,
        dataDaPlantacao
    }})

    await prisma.$disconnect();

    return newPlant;
    }
}
