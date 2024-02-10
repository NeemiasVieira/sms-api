import { Injectable } from '@nestjs/common';
import { ICreateRecordArgs } from './create-records.args';
import prisma from 'src/database/prisma/prisma-client';
import { Record } from '../../record.type';

@Injectable()
export class CreateRecordService {
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

    await prisma.$connect();

    const dataDeRegistro = new Date();

    const novoRegistro = prisma.registros.create({
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

    await prisma.$disconnect();

    return novoRegistro;
  }
}
