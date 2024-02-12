import { Args, Field, Mutation, Resolver } from '@nestjs/graphql';
import { DeletePlantByIdService } from './delete-plant-by-id.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/middlewares/auth/auth';
import { UserType } from 'src/modules/users/user.type';
import { AuthUser } from 'src/decorators/authuser.decorator';

@Resolver()
export class DeletePlantByIdResolver {
    constructor(private readonly deletePlantByIdService: DeletePlantByIdService){}

    @Mutation(() => String)
    @UseGuards(AuthGuard)
    async deletePlant(@Args('id') id: string, @AuthUser() usuario: UserType): Promise<string>{
        return await this.deletePlantByIdService.deletePlant(id, usuario);
    }
}


