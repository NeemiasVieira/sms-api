import { Injectable } from "@nestjs/common";
import { GraphQLError } from "graphql";
import { PrismaService } from "src/database/prisma/prisma.service";
import { UserType } from "src/modules/users/user.type";
import { Data } from "src/utils/Data";
import { ValidationsService } from "src/utils/validations.service";

@Injectable()
export class DeletePlantByIdService {
  constructor(
    private readonly validationsService: ValidationsService,
    private readonly prismaService: PrismaService,
  ) {}

  async deletePlant(id: string, usuario: UserType): Promise<string> {
    if (!this.validationsService.isObjectId(id))
      throw new GraphQLError("O ID é invalido!");

    await this.prismaService.$connect();

    const plantaExiste = await this.prismaService.plantas.findUnique({
      where: { id, dataDeExclusao: null },
    });

    if (!plantaExiste) throw new GraphQLError("Nenhuma planta encontrada");

    if (plantaExiste.idDono !== usuario.id)
      throw new GraphQLError("Usuário não autorizado");

    await this.prismaService.plantas.update({
      where: { id },
      data: {
        dataDeExclusao: new Data(),
      },
    });

    await this.prismaService.$disconnect();

    return `A planta ${plantaExiste.nome} foi excluída com sucesso`;
  }
}
