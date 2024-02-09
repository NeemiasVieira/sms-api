import { Injectable } from '@nestjs/common';
import { Record } from '../../record.type';
import prisma from 'src/database/prisma/prisma-client.ts';
import { GraphQLError } from 'graphql';

@Injectable()
export class GetUltimoRegistroPlantaService {
    async getRecord(id: string): Promise<Record>{
        await prisma.$connect();

        const plantaExiste = await prisma.plantas.findUnique({where: {id}});

        if(!plantaExiste) throw new GraphQLError("Planta não encontrada");

        const ultimoRegistro = await prisma.registros.findFirst({where:{idPlanta: id}, orderBy: {dataDeRegistro: 'desc'}});

        await prisma.$disconnect();

        return ultimoRegistro;
    }
}
