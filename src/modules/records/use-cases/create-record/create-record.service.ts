import { Injectable } from '@nestjs/common';
import { ICreateRecordArgs } from './create-records.args';
import { Record } from '../../record.type';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { GraphQLError } from 'graphql';

@Injectable()
export class CreateRecordService {

  constructor(private readonly prismaService: PrismaService){}

  async createRecord(data: ICreateRecordArgs): Promise<Record> {
    const {
      idPlanta,
      nitrogenio,
      fosforo,
      potassio,
      umidade,
      temperatura,
      pH,
    } = data;

    await this.prismaService.$connect();

    const dataDeRegistro = new Date();

    const planta = await this.prismaService.plantas.findUnique({where: {id: idPlanta}});

    if(planta.idDono !== data.usuario.id) throw new GraphQLError("Usuário não autorizado");

    const novoRegistro = this.prismaService.registros.create({
      data: {
        idPlanta,
        nitrogenio,
        fosforo,
        potassio,
        umidade,
        temperatura,
        pH,
        dataDeRegistro,
      },
    });

    await this.prismaService.$disconnect();

    return novoRegistro;
  }
}
