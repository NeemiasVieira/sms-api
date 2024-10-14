import { Injectable } from "@nestjs/common";
import { GraphQLError } from "graphql";
import { PrismaService } from "src/database/prisma/prisma.service";
import { Record } from "../../record.type";
import { ICreateRecordArgs } from "./create-records.args";

const arredondar = (numero: number) => {
  const fator = 10 ** 2;
  return Math.round(numero * fator) / fator;
};

export const calcularPorcentagemDeLuz = (
  valor: number,
  maxEspecie: number,
): string => {
  if (valor > maxEspecie) {
    return "100";
  }
  const porcentagem = arredondar(
    Number(((valor / maxEspecie) * 100).toFixed(7)),
  );

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

    const planta = await this.prismaService.plantas.findUnique({
      where: { id: idPlanta, dataDeExclusao: null },
    });

    if (planta.idDono !== usuario.id)
      throw new GraphQLError("Usuário não autorizado");

    if (dados.simulado && !planta.simulado) {
      throw new GraphQLError(
        "Um registro simulado só pode ser criado em uma planta simulada.",
      );
    }

    if (planta.simulado && !dados.simulado) {
      throw new GraphQLError(
        "Um registro real só pode ser criado em uma planta configurada como não simulada.",
      );
    }

    const especie = await this.prismaService.especies.findFirst({
      where: { nome: planta.especie, dataDeExclusao: null },
    });

    if (!especie) throw new GraphQLError("Espécie nao encontrada");

    const luz = calcularPorcentagemDeLuz(
      Number(dados.lux),
      Number(especie.maxLuz),
    );

    const totalRegistros = await this.prismaService.registros.count({
      where: { idPlanta },
    });

    const novoRegistro = this.prismaService.registros.create({
      data: {
        ...dados,
        dataDeExclusao: null,
        simulado: dados.simulado ?? null,
        nomeEspecie: especie.nome,
        nuRegistro: totalRegistros + 1,
        luz,
        dataDeRegistro,
      },
    });

    await this.prismaService.$disconnect();

    return novoRegistro;
  }
}
