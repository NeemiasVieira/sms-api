import { Args, Query, Resolver } from '@nestjs/graphql';
import { Plant } from '../../plant.type';
import { UserType } from 'src/modules/users/user.type';
import { AuthUser } from 'src/decorators/authuser.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/middlewares/auth/auth';
import { GetPlantService } from './get-plant.service';

@Resolver()
export class GetPlantResolver {
  constructor(private readonly getPlantService: GetPlantService) {}

  @Query(() => Plant)
  @UseGuards(AuthGuard)
  async getPlant(@Args('idPlanta') idPlanta: string, @AuthUser() usuario: UserType): Promise<Plant> {
    return await this.getPlantService.get(idPlanta, usuario);
  }
}
