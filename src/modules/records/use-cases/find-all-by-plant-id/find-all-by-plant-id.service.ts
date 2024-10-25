import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { ValidationsService } from 'src/utils/validations.service';
import { Record } from '../../record.type';
import { IFindAllByPlantIdArgs } from './find-all-by-plant-id.types';
import { UserType } from 'src/modules/users/user.type';

@Injectable()
export class FindAllByPlantIdService {
  constructor(
    private readonly validationsService: ValidationsService,
    private readonly prismaService: PrismaService
  ) {}

  async getAll(args: IFindAllByPlantIdArgs, usuario: UserType): Promise<Record[]> {
    const { idPlanta, intervaloDeBusca } = args;

    if (!this.validationsService.isObjectId(idPlanta)) {
      throw new GraphQLError('ID da planta é inválido');
    }

    await this.prismaService.$connect();

    const plantaExiste = await this.prismaService.plantas.findUnique({
      where: { id: idPlanta, dataDeExclusao: null },
    });

    if (!plantaExiste) {
      throw new GraphQLError('A planta não existe no banco de dados');
    }

    if (plantaExiste.idDono !== usuario.id) throw new GraphQLError('Usuário não autorizado');

    if (!intervaloDeBusca) {
      const registros = await this.prismaService.registros.findMany({
        where: { idPlanta, dataDeExclusao: null },
        orderBy: {
          dataDeRegistro: 'asc',
        },
      });
      await this.prismaService.$disconnect();
      return registros;
    }

    const currentDate = new Date();
    const startDate = new Date(currentDate.getTime() - intervaloDeBusca * 24 * 60 * 60 * 1000);
    const registros = await this.prismaService.registros.findMany({
      where: {
        idPlanta,
        dataDeExclusao: null,
        dataDeRegistro: {
          gte: startDate,
          lte: currentDate,
        },
      },
      orderBy: {
        dataDeRegistro: 'asc',
      },
    });
    await this.prismaService.$disconnect();
    return registros;
  }
}
