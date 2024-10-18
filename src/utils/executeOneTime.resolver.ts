import { Mutation, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Resolver()
export class ExecuteOneTimeResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Mutation(() => String)
  async executeOneTime() {
    await this.prismaService.$connect();

    const registros = await this.prismaService.registros.findMany();

    registros.forEach(async (registro) => {
      const especie = await this.prismaService.especies.findFirst({ where: { nome: registro.nomeEspecie } });
      await this.prismaService.registros.update({
        where: {
          id: registro.id,
        },
        data: {
          idEspecie: especie.id,
        },
      });
    });

    await this.prismaService.$disconnect();

    return 'Executado com sucesso.';
  }
}
