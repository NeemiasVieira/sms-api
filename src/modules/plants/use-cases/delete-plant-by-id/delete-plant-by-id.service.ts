import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { ValidationsService } from 'src/utils/validations.service';

@Injectable()
export class DeletePlantByIdService {

    constructor(private readonly validationsService: ValidationsService, private readonly prismaService: PrismaService){}

    async deletePlant(id: string): Promise<string>{

    if(!this.validationsService.isObjectId(id)) throw new GraphQLError("O ID é invalido!");

    await this.prismaService.$connect();

    const plantaExiste = await this.prismaService.plantas.findUnique({where:{id}});

    if(!plantaExiste) throw new GraphQLError("Nenhuma planta encontrada");

    await this.prismaService.plantas.delete({where:{id}});

    await this.prismaService.$disconnect();

    return `A planta ${plantaExiste.nome} foi excluída com sucesso`;
    
    }
}
