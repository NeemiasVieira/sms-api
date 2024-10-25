import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AuthUser } from 'src/decorators/authuser.decorator';
import { AuthGuard } from 'src/middlewares/auth/auth';
import { UserType } from 'src/modules/users/user.type';
import { SpecieMapper } from '../../specie-mapper.service';
import { Specie } from '../../specie.type';
import { GetAllSpeciesArgs } from './get-all-species.args';

@Resolver()
export class GetAllSpeciesResolver {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly specieMapper: SpecieMapper
  ) {}

  @Query(() => [Specie])
  @UseGuards(AuthGuard)
  async getAllSpecies(@Args() args: GetAllSpeciesArgs, @AuthUser() usuario: UserType): Promise<Specie[]> {
    const { apenasSimulados, comSimulados } = args;

    let where = {};

    if (apenasSimulados) {
      where = { dataDeExclusao: null, simulado: true, criadoPor: usuario.id };
    } else if (comSimulados) {
      where = {
        dataDeExclusao: null,
        OR: [{ simulado: false }, { simulado: true, criadoPor: usuario.id }],
      };
    } else if (!apenasSimulados && !comSimulados) {
      where = {
        dataDeExclusao: null,
        simulado: false,
      };
    }

    await this.prismaService.$connect();

    const speciesDBA = await this.prismaService.especies.findMany({
      where,
    });

    const resposta = speciesDBA.map((specie) => {
      return this.specieMapper.reverseMapParametros(specie);
    });

    await this.prismaService.$disconnect();

    return resposta;
  }
}
