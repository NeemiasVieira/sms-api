import { Query, Resolver } from "@nestjs/graphql";
import { PrismaService } from "src/database/prisma/prisma.service";
import { User } from "src/modules/users/user.type";

@Resolver()
export class GetUsersResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    await this.prismaService.$connect();

    const allUsers = await this.prismaService.users.findMany({
      where: { dataDeExclusao: null },
    });

    allUsers.forEach((user) => {
      user.email = "informaçao confidencial";
      user.id = "informação confidencial";
      user.senha = "informação confidencial e criptografada";
    });

    await this.prismaService.$disconnect();

    return allUsers;
  }
}
