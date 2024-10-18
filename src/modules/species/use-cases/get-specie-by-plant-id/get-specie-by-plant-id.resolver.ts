import { Args, Query, Resolver } from '@nestjs/graphql';
import { Specie } from '../../specie.type';
import { GraphQLError } from 'graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Resolver()
export class GetSpecieByPlantIdResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => Specie, { nullable: true })
  async getSpecieByPlantId(@Args() idPlanta: string) {
    if (!idPlanta) {
      throw new GraphQLError('O campo idPlanta é obrigatório para essa consulta');
    }

    await this.prismaService.$connect();

    const planta = await this.prismaService.plantas.findUnique({ where: { id: idPlanta } });

    if (!planta) {
      return null;
    }

    const especie = await this.prismaService.especies.findUnique({
      where: {
        id: planta.idEspecie,
      },
    });

    return especie;
  }
}
