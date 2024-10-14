import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { PrismaService } from "src/database/prisma/prisma.service";
import { IsAdmin } from "src/decorators/admin.decorator";
import { AuthGuard } from "src/middlewares/auth/auth";
import { Data } from "src/utils/Data";
import { ValidationsService } from "src/utils/validations.service";

@Resolver()
export class DeleteSpecieResolver {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validationService: ValidationsService,
  ) {}

  @Mutation(() => String)
  @UseGuards(AuthGuard)
  async deleteSpecie(
    @Args("id") id: string,
    @IsAdmin() isAdmin: boolean,
  ): Promise<string> {
    await this.prismaService.$connect();

    if (!this.validationService.isObjectId(id))
      throw new GraphQLError("ID inválido");

    const specie = await this.prismaService.especies.findUnique({
      where: { id, dataDeExclusao: null },
    });

    if (!specie) throw new GraphQLError("Especie nao existe");

    if (!isAdmin && !specie.simulado)
      throw new GraphQLError("Usuário não autorizado");

    await this.prismaService.especies.update({
      where: { id },
      data: {
        dataDeExclusao: new Data(),
      },
    });

    await this.prismaService.$disconnect();

    return `Espécie ${specie.nome} excluída com sucesso!`;
  }
}
