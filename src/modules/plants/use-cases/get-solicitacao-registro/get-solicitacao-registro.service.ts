import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UserType } from 'src/modules/users/user.type';
import { ValidationsService } from 'src/utils/validations.service';
import { ISolicitacaoNovoRegistro } from '../../plant.type';

@Injectable()
export class GetSolicitacaoRegistroService {
  constructor(
    private readonly validationService: ValidationsService,
    private readonly prisma: PrismaService,
  ) {}

  async get(idPlanta: string, usuario: UserType): Promise<ISolicitacaoNovoRegistro> {
    if (!this.validationService.isObjectId(idPlanta)) throw new GraphQLError('idPlanta inválido');

    await this.prisma.$connect();

    const planta = await this.prisma.plantas.findUnique({ where: { id: idPlanta } });

    if (!planta) throw new GraphQLError('Planta não encontrada no sistema');

    if (planta.idDono !== usuario.id) throw new GraphQLError('Usuário não autorizado');

    await this.prisma.$disconnect();

    return planta.solicitacaoNovoRegistro;
  }
}
