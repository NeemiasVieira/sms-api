import { Args, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { SpecieMapper } from '../../specie-mapper.service';
import { Specie } from '../../specie.type';
import { ValidationsService } from 'src/utils/validations.service';
import { GraphQLError } from 'graphql';

@Resolver()
export class GetSpecieResolver {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly specieMapper: SpecieMapper,
    private readonly validationService: ValidationsService,
  ) {}

  @Query(() => Specie)
  async getSpecie(@Args('id') id: string): Promise<Specie> {
    await this.prismaService.$connect();

    if (!this.validationService.isObjectId(id))
      throw new GraphQLError('ID inválido');

    const specie = await this.prismaService.especies.findUnique({
      where: { id },
    });

    if (!specie) throw new GraphQLError('Espécie nao encontrada');

    await this.prismaService.$disconnect();

    return this.specieMapper.reverseMapParametros(specie);
  }
}
