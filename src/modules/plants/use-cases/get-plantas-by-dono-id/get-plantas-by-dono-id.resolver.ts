import { Args, Query, Resolver } from '@nestjs/graphql';
import { Plant } from '../../plant.type';
import { GetPlantasByDonoIdService } from './get-plantas-by-dono-id.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/middlewares/auth/auth';
import { UserType } from 'src/modules/users/user.type';
import { AuthUser } from 'src/decorators/authuser.decorator';

@Resolver()
export class GetPlantasByDonoIdResolver {

    constructor(private readonly getPlantasByDonoIdService: GetPlantasByDonoIdService){}

    @Query(() => [Plant])
    @UseGuards(AuthGuard)
    async getPlantasByDonoId(@AuthUser() usuario: UserType): Promise<Plant[]>{
        return await this.getPlantasByDonoIdService.getPlanta(usuario);
    }
}
