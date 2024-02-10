import { Query, Resolver } from "@nestjs/graphql";
import { User } from "src/modules/users/user.type";
import prisma from "src/database/prisma/prisma-client";

@Resolver()
export class GetUsersResolver{

    @Query(() => [User])
    async getUsers(): Promise<User[]>{

        await prisma.$connect();

        const allUsers = await prisma.users.findMany();

        await prisma.$disconnect();

        return allUsers;
    }

}