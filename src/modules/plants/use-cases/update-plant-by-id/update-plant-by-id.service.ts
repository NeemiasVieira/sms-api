import { Injectable } from '@nestjs/common';
import { Plant } from '../../plant.type';
import { ValidationsService } from 'src/utils/validations.service';
import { GraphQLError } from 'graphql';
import { IPlantaAtualizada } from './update-plant.types';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class UpdatePlantByIdService {

    constructor(private readonly validationsService: ValidationsService, private readonly prismaService: PrismaService){}

    public async updatePlant(id: string, plantaAtualizada: IPlantaAtualizada): Promise<Plant>{
        
    if(!this.validationsService.isObjectId(id)) throw new GraphQLError("O ID é invalido!");

    await this.prismaService.$connect();

    const plantaExiste = await this.prismaService.plantas.findUnique({where:{id}});

    if(!plantaExiste) throw new GraphQLError("Nenhuma planta encontrada");


    const plantaAlterada = await this.prismaService.plantas.update({where: {id}, data: {
        ...plantaAtualizada
    }});

    await this.prismaService.$disconnect();

    return plantaAlterada;

    }
}
