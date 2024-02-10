import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreatePlantService } from './create-plant.service';
import { CreatePlantArgs } from './create-plant.args';
import { Plant } from '../../plant.type';
import { AuthUser } from 'src/decorators/authuser.decorator';
import { UserType } from 'src/modules/users/user.type';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/middlewares/auth/auth';

@Resolver()
@UseGuards(AuthGuard)
export class CreatePlantResolver {
    constructor(private readonly createPlantService: CreatePlantService){}
        
        @Mutation(() => Plant)
        async createPlant(@Args() args: CreatePlantArgs, @AuthUser() usuario: UserType): Promise<Plant>{
            args.usuario = usuario;
            return await this.createPlantService.createPlant(args);
        }
    
}
