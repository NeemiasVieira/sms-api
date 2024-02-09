import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import prisma from 'src/database/prisma/prisma-client.ts';
import { ValidationsService } from 'src/utils/validations.service';

@Injectable()
export class DeletePlantByIdService {

    constructor(private readonly validationsService: ValidationsService){}

    async deletePlant(id: string): Promise<string>{

    if(!this.validationsService.isObjectId(id)) throw new GraphQLError("O ID é invalido!");

    await prisma.$connect();

    const plantaExiste = await prisma.plantas.findUnique({where:{id}});

    if(!plantaExiste) throw new GraphQLError("Nenhuma planta encontrada");

    await prisma.plantas.delete({where:{id}});

    await prisma.$disconnect();

    return `A planta ${plantaExiste.nome} foi excluída com sucesso`;
    
    }
}
