import { Args, Field, Mutation, Resolver } from '@nestjs/graphql';
import { DeletePlantByIdService } from './delete-plant-by-id.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/middlewares/auth/auth';
import { AuthUser } from '../../../../decorators/authuser.decorator';
import { UserType } from 'src/modules/users/user.type';

@Resolver()
export class DeletePlantByIdResolver {
    constructor(private readonly deletePlantByIdService: DeletePlantByIdService){}

    @Mutation(() => String)
    @UseGuards(AuthGuard)
    async deletePlant(@Args('id') id: string, @AuthUser() usuario: UserType): Promise<string>{
        return await this.deletePlantByIdService.deletePlant(id, usuario);
    }
}


