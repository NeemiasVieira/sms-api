import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/decorators/authuser.decorator";
import { AuthGuard } from "src/middlewares/auth/auth";
import { UserType } from "src/modules/users/user.type";
import { Plant } from "../../plant.type";
import { GetPlantasByDonoIdArgs } from "./get-plantas-by-dono-id.args";
import { GetPlantasByDonoIdService } from "./get-plantas-by-dono-id.service";

@Resolver()
export class GetPlantasByDonoIdResolver {
  constructor(
    private readonly getPlantasByDonoIdService: GetPlantasByDonoIdService,
  ) {}

  @Query(() => [Plant])
  @UseGuards(AuthGuard)
  async getPlantasByDonoId(
    @Args() args: GetPlantasByDonoIdArgs,
    @AuthUser() usuario: UserType,
  ): Promise<Plant[]> {
    return await this.getPlantasByDonoIdService.getPlanta(usuario, args);
  }
}
