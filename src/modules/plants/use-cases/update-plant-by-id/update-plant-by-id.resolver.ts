import { IUpdatePlantArgs } from './update-plant.types';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Plant } from '../../plant.type';
import { UpdatePlantByIdService } from './update-plant-by-id.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/middlewares/auth/auth';
import { UserType } from 'src/modules/users/user.type';
import { AuthUser } from 'src/decorators/authuser.decorator';

@Resolver()
export class UpdatePlantByIdResolver {
  constructor(private readonly updatePlantByIdService: UpdatePlantByIdService) {}

  @Mutation(() => Plant)
  @UseGuards(AuthGuard)
  async updatePlant(@Args() updatePlantArgs: IUpdatePlantArgs, @AuthUser() usuario: UserType): Promise<Plant> {
    const { id, plantaAtualizada } = updatePlantArgs;
    return await this.updatePlantByIdService.updatePlant(id, plantaAtualizada, usuario);
  }
}
