import { Injectable } from '@nestjs/common';
import { ICreateRecordArgs } from './create-records.args';
import { Record } from '../../record.type';
import { PrismaService } from 'src/database/prisma/prisma.service';

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
