import { UserType } from 'src/modules/users/user.type';
import {
  IGetAllRecordsPaginatedArgs,
  IGetAllRecordsPaginatedResponse,
  RecordPaginated,
} from './get-all-records-paginated.types';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';

@Injectable()
export class GetAllRecordsPaginatedService {
  constructor(private readonly prisma: PrismaService) {}

  async get(args: IGetAllRecordsPaginatedArgs, usuario: UserType): Promise<IGetAllRecordsPaginatedResponse> {
    await this.prisma.$connect();

    const planta = await this.prisma.plantas.findUnique({ where: { id: args.idPlanta } });

    if (!planta) {
      throw new GraphQLError('Planta não existe');
    }

    if (planta.idDono !== usuario.id) {
      throw new GraphQLError('Usuário não autorizado');
    }

    const { registrosPorPag, dataDeInicioBusca, dataDeFimBusca, idPlanta, pagina } = args;

    //Busca paginada
    const registrosFromDB = await this.prisma.registros.findMany({
      where: {
        idPlanta,
        ...(dataDeInicioBusca &&
          dataDeFimBusca && {
            dataDeRegistro: {
              gte: dataDeInicioBusca.toISOString().substring(0, 10) + 'T00:00:00Z',
              lt: new Date(dataDeFimBusca.toISOString().substring(0, 10) + 'T23:59:59Z'),
            },
          }),
      },
      orderBy: {
        dataDeRegistro: 'desc',
      },
      skip: registrosPorPag * (pagina - 1),
      take: registrosPorPag,
    });

    const allRegistrosFromDB = await this.prisma.registros.findMany({
      where: { idPlanta },
      orderBy: { dataDeRegistro: 'desc' },
    });

    //Faz o calculo dinamico do nuRegistro
    const deParaMap = {};
    for (let i = allRegistrosFromDB.length - 1; i >= 0; i--) {
      const registro = allRegistrosFromDB[i];
      deParaMap[registro.id] = allRegistrosFromDB.length - i;
    }

    const totalRegistros = await this.prisma.registros.count({
      where: {
        idPlanta,
        ...(dataDeInicioBusca &&
          dataDeFimBusca && {
            dataDeRegistro: {
              gte: dataDeInicioBusca.toISOString().substring(0, 10) + 'T00:00:00Z',
              lt: new Date(dataDeInicioBusca.toISOString().substring(0, 10) + 'T23:59:59Z'),
            },
          }),
      },
    });

    const registros: RecordPaginated[] = registrosFromDB.map((registro) => {
      const nuRegistro = deParaMap[registro.id];
      return { ...registro, nuRegistro };
    });

    let totalRegistrosDaBusca: number;

    if (dataDeInicioBusca && dataDeFimBusca) {
      totalRegistrosDaBusca = await this.prisma.registros.count({
        where: {
          idPlanta,
          dataDeRegistro: {
            gte: new Date(dataDeInicioBusca.toISOString().substring(0, 10) + 'T00:00:00Z'),
            lt: new Date(dataDeFimBusca.toISOString().substring(0, 10) + 'T23:59:59Z'),
          },
        },
      });
    }

    const totalPaginas =
      dataDeInicioBusca && dataDeFimBusca
        ? Math.ceil(totalRegistrosDaBusca / registrosPorPag)
        : Math.ceil(totalRegistros / registrosPorPag);

    await this.prisma.$disconnect();

    return {
      registros,
      pagina,
      totalPaginas,
    };
  }
}
