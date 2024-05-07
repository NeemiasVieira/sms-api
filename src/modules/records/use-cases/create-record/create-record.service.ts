import { Injectable } from '@nestjs/common';
import { ICreateRecordArgs } from './create-records.args';
import { Record } from '../../record.type';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { GraphQLError } from 'graphql';

const arredondar = (numero: number) => {
  const fator = 10 ** 2;
  return Math.round(numero * fator) / fator;
};

export const calcularPorcentagemDeLuz = (valor: number, maxEspecie: number): string => {
  if (valor > maxEspecie) {
    return '100';
  }
  const porcentagem = arredondar(Number(((valor / maxEspecie) * 100).toFixed(7)));

  return String(porcentagem);
};

@Injectable()
export class CreateRecordService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRecord(data: ICreateRecordArgs): Promise<Record> {
    const { idPlanta } = data;
    const { usuario, ...dados } = data;

    await this.prismaService.$connect();

    const dataDeRegistro = new Date();

    const planta = await this.prismaService.plantas.findUnique({ where: { id: idPlanta } });

    if (planta.idDono !== usuario.id) throw new GraphQLError('Usuário não autorizado');

    const especie = await this.prismaService.especies.findFirst({ where: { nome: planta.especie } });

    if (!especie) throw new GraphQLError('Espécie nao encontrada');

    const luz = calcularPorcentagemDeLuz(Number(dados.lux), Number(especie.maxLuz));

    const novoRegistro = this.prismaService.registros.create({
      data: {
        ...dados,
        nomeEspecie: especie.nome,
        luz,
        dataDeRegistro,
      },
    });

    await this.prismaService.$disconnect();

    return novoRegistro;
  }
}
