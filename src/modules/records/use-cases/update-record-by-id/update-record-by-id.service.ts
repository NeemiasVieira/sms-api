import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { ValidationsService } from 'src/utils/validations.service';
import { Record } from '../../record.type';
import { IUpdateRecordArgs } from './update-record-by-id.types';

@Injectable()
export class UpdateRecordByIdService {
  constructor(
    private readonly validationsService: ValidationsService,
    private readonly prismaService: PrismaService
  ) {}

  async updateRecord(args: IUpdateRecordArgs): Promise<Record> {
    const { id, usuario, ...data } = args;

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

    const registroAtualizado = await this.prismaService.registros.update({
      where: { id },
      data: {
        ...data,
      },
    });

    await this.prismaService.$disconnect();

    return registroAtualizado;
  }
}
