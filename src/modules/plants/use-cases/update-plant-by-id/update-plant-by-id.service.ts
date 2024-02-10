import { Injectable } from '@nestjs/common';
import { Plant } from '../../plant.type';
import { ValidationsService } from 'src/utils/validations.service';
import { GraphQLError } from 'graphql';
import prisma from 'src/database/prisma/prisma-client.ts';
import { IPlantaAtualizada } from './update-plant.types';

@Injectable()
export class UpdatePlantByIdService {

    constructor(private readonly validationsService: ValidationsService){}

    public async updatePlant(id: string, plantaAtualizada: IPlantaAtualizada): Promise<Plant>{
        
    if(!this.validationsService.isObjectId(id)) throw new GraphQLError("O ID é invalido!");

    await prisma.$connect();

    const plantaExiste = await prisma.plantas.findUnique({where:{id}});

    if(!plantaExiste) throw new GraphQLError("Nenhuma planta encontrada");


    const plantaAlterada = await prisma.plantas.update({where: {id}, data: {
        ...plantaAtualizada
    }});

    await prisma.$disconnect();

    return plantaAlterada;

    }
}
