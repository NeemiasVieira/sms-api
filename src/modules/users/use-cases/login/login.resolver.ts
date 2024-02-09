import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { IAuthorization, LoginUserArgs } from "./login.args";
import { ILoginUserResponse } from "./login.args";
import { LoginService } from "./login.service";

@Resolver()
export class LoginResolver{

    constructor(private readonly loginService: LoginService){}

    @Mutation(() => ILoginUserResponse)
    async loginUser(@Args() dados : LoginUserArgs){

        const {email, senha} = dados;

        return await this.loginService.login(email, senha);

    }

    @Query(() => IAuthorization)
    async getToken(@Args() dados : LoginUserArgs): Promise<IAuthorization>{
        const {email, senha} = dados;

        const info = await this.loginService.login(email, senha);

        return {Authorization: `Bearer ${info.token}`};
    }


}