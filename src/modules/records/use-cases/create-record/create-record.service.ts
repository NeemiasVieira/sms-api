import { Injectable } from '@nestjs/common';
import { ICreateRecordArgs } from './create-records.args';
import { Record } from '../../record.type';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { GraphQLError } from 'graphql';

const calcularPorcentagemDeLuz = (valor: number): string => {

  if (valor > 20000) {
    return "100";
  }
  const porcentagem = (valor / 20000) * 100;

  return String(Math.round(porcentagem));
}


@Injectable()
export class CreateRecordService {

  constructor(private readonly prismaService: PrismaService){}

  async createRecord(data: ICreateRecordArgs): Promise<Record> {

    const { idPlanta } = data;
    const { usuario, ...dados } = data;

    dados.luz = calcularPorcentagemDeLuz(Number(dados.luz));

    await this.prismaService.$connect();

    const dataDeRegistro = new Date();

    const planta = await this.prismaService.plantas.findUnique({where: {id: idPlanta}});

    if(planta.idDono !== usuario.id) throw new GraphQLError("Usuário não autorizado");
    
    const novoRegistro = this.prismaService.registros.create({
      data: {
        ...dados,
        dataDeRegistro,
      },
    });

    await this.prismaService.$disconnect();

    return novoRegistro;
  }
}
