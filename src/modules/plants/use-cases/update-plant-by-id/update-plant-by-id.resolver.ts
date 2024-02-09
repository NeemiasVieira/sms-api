import { IUpdatePlantArgs } from './update-plant.types';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Plant } from '../../plant.type';
import { UpdatePlantByIdService } from './update-plant-by-id.service';

@Resolver()
export class UpdatePlantByIdResolver {

    constructor(private readonly updatePlantByIdService: UpdatePlantByIdService){}

    @Mutation(() => Plant)
    async updatePlant(@Args() updatePlantArgs: IUpdatePlantArgs): Promise<Plant>{
        const {id, plantaAtualizada} = updatePlantArgs;
        return await this.updatePlantByIdService.updatePlant(id, plantaAtualizada);
    }
}
