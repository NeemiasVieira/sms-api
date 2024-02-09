import { Args, Query, Resolver } from '@nestjs/graphql';
import { Plant } from '../../plant.type';
import { GetPlantasByDonoIdService } from './get-plantas-by-dono-id.service';

@Resolver()
export class GetPlantasByDonoIdResolver {

    constructor(private readonly getPlantasByDonoIdService: GetPlantasByDonoIdService){}

    @Query(() => [Plant])
    async getPlantasByDonoId(@Args('idDono') idDono: string ): Promise<Plant[]>{
        return await this.getPlantasByDonoIdService.getPlanta(idDono);
    }
}
