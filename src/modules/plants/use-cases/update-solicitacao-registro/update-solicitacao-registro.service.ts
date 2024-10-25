import { Injectable } from "@nestjs/common";
import { GraphQLError } from "graphql";
import { PrismaService } from "src/database/prisma/prisma.service";
import { UserType } from "src/modules/users/user.type";
import { ValidationsService } from "src/utils/validations.service";
import { ISolicitacaoNovoRegistro, Plant } from "../../plant.type";
import { UpdateSolicitacaoRegistroArgs } from "./update-solicitacao.args";

@Injectable()
export class UpdateSolicitacaoRegistroService {
  constructor(
    private readonly validationService: ValidationsService,
    private readonly prisma: PrismaService,
  ) {}

  async update(
    args: UpdateSolicitacaoRegistroArgs,
    usuario: UserType,
  ): Promise<Plant> {
    const { idPlanta } = args;

    let contador = 0;
    let valor: ISolicitacaoNovoRegistro;

    Object.keys(args).forEach((key) => {
      if (args[key]) {
        contador++;
        if (key !== "idPlanta") valor = key as ISolicitacaoNovoRegistro;
      }
    });

    if (contador !== 2) throw new GraphQLError("Número invalido de argumentos");

    if (!this.validationService.isObjectId(idPlanta))
      throw new GraphQLError("ID da planta inválido");

    await this.prisma.$connect();

    const planta = await this.prisma.plantas.findUnique({
      where: { id: idPlanta, dataDeExclusao: null },
    });

    if (!planta) throw new GraphQLError("Planta não encontrada no sistema");

    if (planta.idDono !== usuario.id)
      throw new GraphQLError("Usuário não autorizado");

    const plantaAtualizada = await this.prisma.plantas.update({
      where: { id: idPlanta },
      data: {
        solicitacaoNovoRegistro: valor,
      },
    });

    await this.prisma.$disconnect();

    return plantaAtualizada;
  }
}
