import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Specie } from '../../specie.type';
import { SpecieMapper } from '../../specie-mapper.service';

@Resolver()
export class GetAllSpeciesResolver {
  constructor(private readonly prismaService: PrismaService, private readonly specieMapper: SpecieMapper){}

  @Query(() => [Specie])
  async getAllSpecies(): Promise<Specie[]>{
    await this.prismaService.$connect();
    const speciesDBA =  await this.prismaService.especies.findMany();
    const resposta = speciesDBA.map((specie) => {
      return this.specieMapper.reverseMapParametros(specie);
    })

    await this.prismaService.$disconnect();

    return resposta;

  }
}
