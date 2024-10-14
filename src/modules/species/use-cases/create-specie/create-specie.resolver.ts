import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { PrismaService } from "src/database/prisma/prisma.service";
import { IsAdmin } from "src/decorators/admin.decorator";
import { AuthGuard } from "src/middlewares/auth/auth";
import { SpecieMapper } from "../../specie-mapper.service";
import { Specie } from "../../specie.type";
import { CreateSpecieArgs } from "./create-specie.args";

@Resolver()
export class CreateSpecieResolver {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly specieMapper: SpecieMapper,
  ) {}
  @UseGuards(AuthGuard)
  @Mutation(() => Specie)
  async createSpecie(
    @Args() args: CreateSpecieArgs,
    @IsAdmin() isAdmin: boolean,
  ): Promise<Specie> {
    const { simulado } = args;

    if (!isAdmin && !simulado)
      throw new GraphQLError("Usuário não autorizado!");

    await this.prismaService.$connect();

    const { parametros, ...data } = args;

    const especieExiste = await this.prismaService.especies.findFirst({
      where: { nome: args.nome, dataDeExclusao: null },
    });

    if (especieExiste)
      throw new GraphQLError("Essa espécie já foi cadastrada no sistema");

    const novaEspecie = await this.prismaService.especies.create({
      data: {
        ...data,
        ...this.specieMapper.mapParametros(parametros),
        dataDeExclusao: null,
        simulado: simulado ?? false,
        criadoPor: null,
      },
    });

    await this.prismaService.$disconnect();

    return this.specieMapper.reverseMapParametros(novaEspecie);
  }
}
