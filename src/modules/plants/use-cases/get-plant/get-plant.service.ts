import { Injectable } from '@nestjs/common';
import { Plant } from '../../plant.type';
import { UserType } from 'src/modules/users/user.type';
import { ValidationsService } from 'src/utils/validations.service';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { GraphQLError } from 'graphql';

@Injectable()
export class GetPlantService {
  constructor(
    private readonly validationService: ValidationsService,
    private readonly prisma: PrismaService,
  ) {}

  async get(idPlanta: string, usuario: UserType): Promise<Plant> {
    if (!this.validationService.isObjectId(idPlanta)) throw new GraphQLError('ID inválido');

    await this.prisma.$connect();

    const planta = await this.prisma.plantas.findUnique({ where: { id: idPlanta } });

    if (!planta) throw new GraphQLError('Planta não encontrada pelo sistema');

    if (planta.idDono !== usuario.id) throw new GraphQLError('Usuário não autorizado');

    if (planta.solicitacaoNovoRegistro === 'confirmado') {
      await this.prisma.plantas.update({
        where: { id: idPlanta },
        data: { solicitacaoNovoRegistro: 'nenhuma' },
      });
    }

    await this.prisma.$disconnect();

    return planta;
  }
}
