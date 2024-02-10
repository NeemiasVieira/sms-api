import { Injectable } from '@nestjs/common';
import { Record } from '../../record.type';
import { GraphQLError } from 'graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class GetUltimoRegistroPlantaService {

    constructor(private readonly prismaService: PrismaService){}

    async getRecord(id: string): Promise<Record>{
        await this.prismaService.$connect();

        const plantaExiste = await this.prismaService.plantas.findUnique({where: {id}});

        if(!plantaExiste) throw new GraphQLError("Planta não encontrada");

        const ultimoRegistro = await this.prismaService.registros.findFirst({where:{idPlanta: id}, orderBy: {dataDeRegistro: 'desc'}});

        await this.prismaService.$disconnect();

        return ultimoRegistro;
    }
}
