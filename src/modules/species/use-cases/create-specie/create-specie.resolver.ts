import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Specie } from '../../specie.type';
import { CreateSpecieArgs } from './create-specie.args';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { SpecieMapper } from '../../specie-mapper.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/middlewares/auth/auth';
import { IsAdmin } from 'src/decorators/admin.decorator';
import { GraphQLError } from 'graphql';

@Resolver()
export class CreateSpecieResolver {

  constructor(private readonly prismaService: PrismaService, private readonly specieMapper: SpecieMapper) {} 
  @UseGuards(AuthGuard)
  @Mutation(() => Specie)
  async createSpecie(@Args() args: CreateSpecieArgs, @IsAdmin() isAdmin: boolean): Promise<Specie>{

    if(!isAdmin) throw new GraphQLError("Usuário sem permissao de modificaçao");

    await this.prismaService.$connect();

    const { parametros, ...data } = args;

    const especieExiste = await this.prismaService.especies.findFirst({where: {nome: args.nome}});

    if(especieExiste) throw new GraphQLError("Essa espécie já foi cadastrada no sistema");

    const novaEspecie = await this.prismaService.especies.create({ data: {
      ...data,
      ...this.specieMapper.mapParametros(parametros)
    }});

    await this.prismaService.$disconnect();

    return this.specieMapper.reverseMapParametros(novaEspecie);
  }
}
