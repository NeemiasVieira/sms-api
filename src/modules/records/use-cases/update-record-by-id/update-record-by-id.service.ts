import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { ValidationsService } from 'src/utils/validations.service';
import { Record } from '../../record.type';
import { IUpdateRecordArgs } from './update-record-by-id.types';
import { UserType } from 'src/modules/users/user.type';
import { calcularPorcentagemDeLuz } from '../create-record/create-record.service';

@Injectable()
export class UpdateRecordByIdService {
  constructor(
    private readonly validationsService: ValidationsService,
    private readonly prismaService: PrismaService
  ) {}

  async updateRecord(args: IUpdateRecordArgs, usuario: UserType): Promise<Record> {
    const { id, ...data } = args;

    if (!this.validationsService.isObjectId(id)) throw new GraphQLError('ID invalido!');

    await this.prismaService.$connect();

    const registro = await this.prismaService.registros.findUnique({
      where: { id, dataDeExclusao: null },
    });

    if (!registro) throw new GraphQLError('Registro não encontrado');

    const planta = await this.prismaService.plantas.findUnique({
      where: { id: registro.idPlanta, dataDeExclusao: null },
    });

    if (!planta) throw new GraphQLError('Planta não encontrada');

    if (planta.idDono !== usuario.id) throw new GraphQLError('Usuário não autorizado');

    const atualizacaoNaoAutorizada = !(planta.simulado && registro.simulado);

    if (atualizacaoNaoAutorizada) {
      throw new GraphQLError('Só é possível atualizar registros simulados');
    }

    const especie = await this.prismaService.especies.findFirst({
      where: { nome: planta.especie, dataDeExclusao: null },
    });

    if (!especie) throw new GraphQLError('Espécie nao encontrada');

    const luz = calcularPorcentagemDeLuz(Number(data.lux), Number(especie.maxLuz));

    const registroAtualizado = await this.prismaService.registros.update({
      where: { id },
      data: {
        luz,
        ...data,
      },
    });

    await this.prismaService.$disconnect();

    return registroAtualizado;
  }
}
