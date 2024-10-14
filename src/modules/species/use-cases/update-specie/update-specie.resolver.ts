import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { PrismaService } from "src/database/prisma/prisma.service";
import { IsAdmin } from "src/decorators/admin.decorator";
import { AuthGuard } from "src/middlewares/auth/auth";
import { ValidationsService } from "src/utils/validations.service";
import { SpecieMapper } from "../../specie-mapper.service";
import { Specie } from "../../specie.type";
import { UpdateSpecieArgs } from "./update-specie.args";

@Resolver()
export class UpdateSpecieResolver {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validationService: ValidationsService,
    private readonly specieMapper: SpecieMapper,
  ) {}

  @Mutation(() => Specie)
  @UseGuards(AuthGuard)
  async updateSpecie(
    @Args() args: UpdateSpecieArgs,
    @IsAdmin() isAdmin: boolean,
  ): Promise<Specie> {
    if (!this.validationService.isObjectId(args.id))
      throw new GraphQLError("ID inválido");

    // eslint-disable-next-line
    const { id, parametros: params, ...data } = args;

    await this.prismaService.$connect();

    const specie = await this.prismaService.especies.findUnique({
      where: { id, dataDeExclusao: null },
    });

    if (!specie) throw new GraphQLError("Espécie nao encontrada");

    if (!isAdmin && !specie.simulado) {
      throw new GraphQLError("Usuário não autorizado.");
    }

    const parametros = this.specieMapper.mapParametros(args.parametros);

    const specieAtualizada = await this.prismaService.especies.update({
      where: { id },
      data: {
        ...data,
        ...parametros,
      },
    });

    await this.prismaService.$disconnect();

    return this.specieMapper.reverseMapParametros(specieAtualizada);
  }
}
