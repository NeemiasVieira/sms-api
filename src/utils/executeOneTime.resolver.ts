import { Mutation, Resolver } from "@nestjs/graphql";
import { PrismaService } from "src/database/prisma/prisma.service";

@Resolver()
export class ExecuteOneTimeResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Mutation(() => String)
  async executeOneTime() {
    await this.prismaService.$connect();

    // Executar a acao aqui

    await this.prismaService.$disconnect();

    return "Executado com sucesso.";
  }
}
