import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CreateUserArgs } from "./create-user.args";
import { User } from "src/modules/users/user.type";
import { CreateUserService } from "./create-user.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/middlewares/auth/auth";

@Resolver()
export class CreateUserResolver{

    constructor(private readonly createUserService: CreateUserService){}

    @Mutation(() => User)
    // @UseGuards(AuthGuard)
    async createUser(@Args() novoUsuario : CreateUserArgs) : Promise<User>{

        const {nome, email, senha} = novoUsuario;

        const newUser = await this.createUserService.createUser(nome, email, senha);

        return newUser;
    }

}