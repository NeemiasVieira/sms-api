import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { IsAdmin } from 'src/decorators/admin.decorator';
import { AuthGuard } from 'src/middlewares/auth/auth';
import { ValidationsService } from 'src/utils/validations.service';
import { SpecieMapper } from '../../specie-mapper.service';
import { Specie } from '../../specie.type';
import { UpdateSpecieArgs } from './update-specie.args';
import { AuthUser } from 'src/decorators/authuser.decorator';
import { UserType } from 'src/modules/users/user.type';

@Resolver()
export class UpdateSpecieResolver {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validationService: ValidationsService,
    private readonly specieMapper: SpecieMapper
  ) {}

  @Mutation(() => Specie)
  @UseGuards(AuthGuard)
  async updateSpecie(
    @Args() args: UpdateSpecieArgs,
    @IsAdmin() isAdmin: boolean,
    @AuthUser() user: UserType
  ): Promise<Specie> {
    if (!this.validationService.isObjectId(args.id)) throw new GraphQLError('ID inválido');

    // eslint-disable-next-line
    const { id, parametros: params, ...data } = args;

    await this.prismaService.$connect();

    const specie = await this.prismaService.especies.findUnique({
      where: { id, dataDeExclusao: null },
    });

    if (!specie) throw new GraphQLError('Espécie nao encontrada');

    if (!isAdmin && !specie.simulado) {
      throw new GraphQLError('Usuário não autorizado.');
    }

    const especieSimuladaComMesmoNome = this.prismaService.especies.findFirst({
      where: { nome: args.nome, dataDeExclusao: null, criadoPor: user.id },
    });

    const especieOficialComMesmoNome = this.prismaService.especies.findFirst({
      where: { nome: args.nome, dataDeExclusao: null, simulado: false },
    });

    const [especieSimuladaJaExiste, especieOficialJaExiste] = await Promise.all([
      especieSimuladaComMesmoNome,
      especieOficialComMesmoNome,
    ]);

    if (especieSimuladaJaExiste && especieSimuladaJaExiste.id !== args.id) {
      throw new GraphQLError(
        `O nome da espécie precisa ser alterado pois conflita 
        com uma espécie ${especieSimuladaJaExiste.simulado ? 'simulada' : 'oficial'} criada por você.`
      );
    }

    if (especieOficialJaExiste && especieOficialJaExiste.id !== args.id)
      throw new GraphQLError('O nome da espécie precisa ser alterado pois conflita com uma espécie oficial.');

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
