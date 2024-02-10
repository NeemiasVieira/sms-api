import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { Plant } from '../../plant.type';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class CreatePlantService {

    constructor(private readonly prismaService: PrismaService){}

    async createPlant(idDono: string, nome: string, especie: string): Promise<Plant>{

    await this.prismaService.$connect();

    if(idDono.length !== 24) throw new GraphQLError("O ID do dono da planta é invalido");
    
    const dono = await this.prismaService.users.findUnique({where:{id: idDono}});

    if(!dono) throw new GraphQLError("Usuário (Dono) não existe");

    const dataDaPlantacao = new Date();

    const newPlant = await this.prismaService.plantas.create({data:{
        idDono,
        nome,
        especie,
        dataDaPlantacao
    }})

    await this.prismaService.$disconnect();

    return newPlant;
    }
}
