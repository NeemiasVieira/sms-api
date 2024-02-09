import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreatePlantService } from './create-plant.service';
import { CreatePlantArgs } from './create-plant.args';
import { Plant } from '../../plant.type';

@Resolver()
export class CreatePlantResolver {
    constructor(private readonly createPlantService: CreatePlantService){}
        
        @Mutation(() => Plant)
        async createPlant(@Args() createPlantArgs: CreatePlantArgs): Promise<Plant>{
            const {idDono, nome, especie} = createPlantArgs;
            return await this.createPlantService.createPlant(idDono, nome, especie);
        }
    
}
