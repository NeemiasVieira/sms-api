import { UseGuards } from "@nestjs/common";
import { Resolver, Query } from "@nestjs/graphql";
import { AuthUser } from "src/decorators/authuser.decorator";
import { AuthGuard } from "src/middlewares/auth/auth";
import { UserType } from "../../user.type";

@Resolver()
export class GetUserProfile{
  @Query(() => String)
  @UseGuards(AuthGuard)
  async getUserProfile(@AuthUser() usuario: UserType): Promise<string>{
    return usuario.profile;
  }
}