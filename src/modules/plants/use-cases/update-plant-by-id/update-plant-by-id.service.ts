import { Injectable } from "@nestjs/common";
import { GraphQLError } from "graphql";
import { PrismaService } from "src/database/prisma/prisma.service";
import { UserType } from "src/modules/users/user.type";
import { ValidationsService } from "src/utils/validations.service";
import { Plant } from "../../plant.type";
import { IPlantaAtualizada } from "./update-plant.types";

@Injectable()
export class UpdatePlantByIdService {
  constructor(
    private readonly validationsService: ValidationsService,
    private readonly prismaService: PrismaService,
  ) {}

  public async updatePlant(
    id: string,
    plantaAtualizada: IPlantaAtualizada,
    usuario: UserType,
  ): Promise<Plant> {
    if (!this.validationsService.isObjectId(id))
      throw new GraphQLError("O ID é invalido!");

    await this.prismaService.$connect();

    const plantaExiste = await this.prismaService.plantas.findUnique({
      where: { id, dataDeExclusao: null },
    });

    if (!plantaExiste) throw new GraphQLError("Nenhuma planta encontrada");

    if (plantaExiste.idDono !== usuario.id)
      throw new GraphQLError("Usuário não autorizado");

    const plantaAlterada = await this.prismaService.plantas.update({
      where: { id },
      data: {
        ...plantaAtualizada,
      },
    });

    await this.prismaService.$disconnect();

    return plantaAlterada;
  }
}
