import { Injectable } from '@nestjs/common';
import { Plant } from '../../plant.type';
import { ValidationsService } from 'src/utils/validations.service';
import { GraphQLError } from 'graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class GetPlantasByDonoIdService {

    constructor(private readonly validationsService: ValidationsService, private readonly prismaService: PrismaService){}

    async getPlanta(id: string): Promise<Plant[]>{
    await this.prismaService.$connect();

    if(!this.validationsService.isObjectId(id)) throw new GraphQLError("ID invalido!");

    const dono = await this.prismaService.users.findUnique({where: {id}});

    if(!dono) throw new GraphQLError("Não existe nenhum usuário com esse ID");

    const plantas = await this.prismaService.plantas.findMany({where: {idDono: id}});

    await this.prismaService.$disconnect();

    return plantas;
    
    }
}
