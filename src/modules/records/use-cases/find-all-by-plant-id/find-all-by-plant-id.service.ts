import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import prisma from 'src/database/prisma/prisma-client';
import { ValidationsService } from 'src/utils/validations.service';
import { Record } from '../../record.type';

@Injectable()
export class FindAllByPlantIdService {

    constructor(private readonly validationsService: ValidationsService){}

  async getAll(idPlanta: string, intervaloDeDias: number, intervaloDeBusca: number): Promise<Record[]> {
    if (!this.validationsService.isObjectId(idPlanta)) {
        throw new GraphQLError("ID da planta é inválido");
      }
    
      await prisma.$connect();
    
      const plantaExiste = await prisma.plantas.findUnique({
        where: { id: idPlanta },
      });
    
      if (!plantaExiste) {
        throw new GraphQLError("A planta não existe no banco de dados");
      }
    
      let registros;
    
      if (!intervaloDeDias && !intervaloDeBusca) {
        registros = await prisma.registros.findMany({
          where: { idPlanta },
          orderBy: {
            dataDeRegistro: "asc",
          },
        });
        await prisma.$disconnect();
        return registros;
      }
    
      if (!intervaloDeDias && intervaloDeBusca) {
        const currentDate = new Date();
        const startDate = new Date(
          currentDate.getTime() - intervaloDeBusca * 24 * 60 * 60 * 1000
        );
        registros = await prisma.registros.findMany({
          where: {
            idPlanta,
            dataDeRegistro: {
              gte: startDate,
              lte: currentDate,
            },
          },
          orderBy: {
            dataDeRegistro: "asc",
          },
        });
        await prisma.$disconnect();
        return registros;
      }
    
      if (intervaloDeDias && !intervaloDeBusca) {
        registros = await prisma.registros.findMany({ where: { idPlanta } });
      }
    
      if (intervaloDeDias && intervaloDeBusca) {
        const currentDate = new Date();
        const startDate = new Date(
          currentDate.getTime() - intervaloDeBusca * 24 * 60 * 60 * 1000
        );
        registros = await prisma.registros.findMany({
          where: {
            idPlanta,
            dataDeRegistro: {
              gte: startDate,
              lte: currentDate,
            },
          },
        });
      }
    
      const aggregatedRecords = [];
    
      if (registros.length > 0) {
        aggregatedRecords.push(registros[0]);
    
        for (let i = 1; i < registros.length; i++) {
          const registroDate = new Date(registros[i].dataDeRegistro);
          const lastAggregatedDate = new Date(
            aggregatedRecords[aggregatedRecords.length - 1].dataDeRegistro
          );
          const daysDifference = Math.floor(
            (lastAggregatedDate.getTime() - registroDate.getTime()) / (24 * 60 * 60 * 1000)
          );
    
          if (daysDifference >= intervaloDeDias) {
            aggregatedRecords.push(registros[i]);
          }
        }
      }
    
      await prisma.$disconnect();
    
      return aggregatedRecords.reverse();
  }
}
