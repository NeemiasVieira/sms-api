import { Injectable } from '@nestjs/common';
import { Plant } from '../../plant.type';
import prisma from 'src/database/prisma/prisma-client';
import { ValidationsService } from 'src/utils/validations.service';
import { GraphQLError } from 'graphql';

@Injectable()
export class GetPlantasByDonoIdService {

    constructor(private readonly validationsService: ValidationsService){}


    async getPlanta(id: string): Promise<Plant[]>{
    await prisma.$connect();

    if(!this.validationsService.isObjectId(id)) throw new GraphQLError("ID invalido!");

    const dono = await prisma.users.findUnique({where: {id}});

    if(!dono) throw new GraphQLError("Não existe nenhum usuário com esse ID");

    const plantas = await prisma.plantas.findMany({where: {idDono: id}});

    await prisma.$disconnect();

    return plantas;
    
    }
}
