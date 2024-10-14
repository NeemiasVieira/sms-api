import { Injectable } from "@nestjs/common";
import { GraphQLError } from "graphql";
import { PrismaService } from "src/database/prisma/prisma.service";
import { UserType } from "src/modules/users/user.type";
import {
  IGetAllRecordsPaginatedArgs,
  IGetAllRecordsPaginatedResponse,
} from "./get-all-records-paginated.types";

@Injectable()
export class GetAllRecordsPaginatedService {
  constructor(private readonly prisma: PrismaService) {}

  async get(
    args: IGetAllRecordsPaginatedArgs,
    usuario: UserType,
  ): Promise<IGetAllRecordsPaginatedResponse> {
    await this.prisma.$connect();

    const planta = await this.prisma.plantas.findUnique({
      where: { id: args.idPlanta, dataDeExclusao: null },
    });

    if (!planta) {
      throw new GraphQLError("Planta não existe");
    }

    if (planta.idDono !== usuario.id) {
      throw new GraphQLError("Usuário não autorizado");
    }

    const {
      registrosPorPag,
      dataDeInicioBusca,
      dataDeFimBusca,
      idPlanta,
      pagina,
    } = args;

    //Busca paginada
    const registros = await this.prisma.registros.findMany({
      where: {
        idPlanta,
        dataDeExclusao: null,
        ...(dataDeInicioBusca &&
          dataDeFimBusca && {
            dataDeRegistro: {
              gte:
                dataDeInicioBusca.toISOString().substring(0, 10) + "T00:00:00Z",
              lt: new Date(
                dataDeFimBusca.toISOString().substring(0, 10) + "T23:59:59Z",
              ),
            },
          }),
      },
      orderBy: {
        dataDeRegistro: "desc",
      },
      skip: registrosPorPag * (pagina - 1),
      take: registrosPorPag,
    });

    const totalRegistros = await this.prisma.registros.count({
      where: {
        idPlanta,
        ...(dataDeInicioBusca &&
          dataDeFimBusca && {
            dataDeRegistro: {
              gte:
                dataDeInicioBusca.toISOString().substring(0, 10) + "T00:00:00Z",
              lt: new Date(
                dataDeInicioBusca.toISOString().substring(0, 10) + "T23:59:59Z",
              ),
            },
          }),
      },
    });

    const totalPaginas = Math.ceil(totalRegistros / registrosPorPag);
    const totalResultados = totalRegistros;

    await this.prisma.$disconnect();

    return {
      registros,
      pagina,
      totalPaginas,
      totalResultados,
    };
  }
}
