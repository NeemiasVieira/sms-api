import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { ValidationsService } from 'src/utils/validations.service';
import { Record } from '../../record.type';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { IFindAllByPlantIdArgs } from './find-all-by-plant-id.types';

@Injectable()
export class FindAllByPlantIdService {

    constructor(private readonly validationsService: ValidationsService, private readonly prismaService: PrismaService){}

  async getAll(args: IFindAllByPlantIdArgs): Promise<Record[]> {

    const { idPlanta, intervaloDeDias, intervaloDeBusca, usuario } = args;

    if (!this.validationsService.isObjectId(idPlanta)) {
        throw new GraphQLError("ID da planta é inválido");
      }
    
      await this.prismaService.$connect();
    
      const plantaExiste = await this.prismaService.plantas.findUnique({
        where: { id: idPlanta },
      });
    
      if (!plantaExiste) {
        throw new GraphQLError("A planta não existe no banco de dados");
      }

      if(plantaExiste.idDono !== usuario.id) throw new GraphQLError("Usuário não autorizado");
    
      let registros;
    
      if (!intervaloDeDias && !intervaloDeBusca) {
        registros = await this.prismaService.registros.findMany({
          where: { idPlanta },
          orderBy: {
            dataDeRegistro: "asc",
          },
        });
        await this.prismaService.$disconnect();
        return registros;
      }
    
      if (!intervaloDeDias && intervaloDeBusca) {
        const currentDate = new Date();
        const startDate = new Date(
          currentDate.getTime() - intervaloDeBusca * 24 * 60 * 60 * 1000
        );
        registros = await this.prismaService.registros.findMany({
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
        await this.prismaService.$disconnect();
        return registros;
      }
    
      if (intervaloDeDias && !intervaloDeBusca) {
        registros = await this.prismaService.registros.findMany({ where: { idPlanta } });
      }
    
      if (intervaloDeDias && intervaloDeBusca) {
        const currentDate = new Date();
        const startDate = new Date(
          currentDate.getTime() - intervaloDeBusca * 24 * 60 * 60 * 1000
        );
        registros = await this.prismaService.registros.findMany({
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
    
      await this.prismaService.$disconnect();
    
      return aggregatedRecords.reverse();
  }
}
