import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { IsAdmin } from 'src/decorators/admin.decorator';
import { AuthGuard } from 'src/middlewares/auth/auth';
import { SpecieMapper } from '../../specie-mapper.service';
import { Specie } from '../../specie.type';
import { CreateSpecieArgs } from './create-specie.args';
import { AuthUser } from 'src/decorators/authuser.decorator';
import { UserType } from 'src/modules/users/user.type';

@Resolver()
export class CreateSpecieResolver {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly specieMapper: SpecieMapper
  ) {}
  @UseGuards(AuthGuard)
  @Mutation(() => Specie)
  async createSpecie(
    @Args() args: CreateSpecieArgs,
    @IsAdmin() isAdmin: boolean,
    @AuthUser() user: UserType
  ): Promise<Specie> {
    const { simulado } = args;

    if (!isAdmin && !simulado) throw new GraphQLError('Usuário não autorizado!');

    await this.prismaService.$connect();

    const { parametros, nome, ...data } = args;

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

    if (especieSimuladaJaExiste) {
      throw new GraphQLError(
        `O nome da espécie precisa ser alterado pois conflita 
        com uma espécie ${especieSimuladaJaExiste.simulado ? 'simulada' : 'oficial'} criada por você.`
      );
    }

    if (especieOficialJaExiste)
      throw new GraphQLError('O nome da espécie precisa ser alterado pois conflita com uma espécie oficial.');

    const novaEspecie = await this.prismaService.especies.create({
      data: {
        dataDeExclusao: null,
        simulado: simulado ?? false,
        criadoPor: user.id,
        nome: nome?.trim(),
        descricao: data?.descricao ?? '',
        ...data,
        ...this.specieMapper.mapParametros(parametros),
      },
    });

    await this.prismaService.$disconnect();

    return this.specieMapper.reverseMapParametros(novaEspecie);
  }
}
