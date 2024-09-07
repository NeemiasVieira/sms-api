import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { PrismaService } from "src/database/prisma/prisma.service";
import { UpdateSpecieArgs } from "./update-specie.args";
import { ValidationsService } from "src/utils/validations.service";
import { SpecieMapper } from "../../specie-mapper.service";
import { GraphQLError } from "graphql";
import { Specie } from "../../specie.type";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/middlewares/auth/auth";
import { IsAdmin } from "src/decorators/admin.decorator";

@Resolver()
export class UpdateSpecieResolver {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validationService: ValidationsService,
    private readonly specieMapper: SpecieMapper
  ) {}

  @Mutation(() => Specie)
  @UseGuards(AuthGuard)
  async updateSpecie(@Args() args: UpdateSpecieArgs, @IsAdmin() isAdmin: boolean): Promise<Specie> {
    if (!isAdmin) throw new GraphQLError("Usuário sem permissao de modificaçao");

    if (!this.validationService.isObjectId(args.id)) throw new GraphQLError("ID inválido");

    // eslint-disable-next-line
    const { id, parametros: params, ...data } = args;

    await this.prismaService.$connect();

    const specie = await this.prismaService.especies.findUnique({ where: { id } });

    if (!specie) throw new GraphQLError("Espécie nao encontrada");

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
