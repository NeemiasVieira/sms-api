import { Args, Field, Mutation, Resolver } from '@nestjs/graphql';
import { DeletePlantByIdService } from './delete-plant-by-id.service';
import { ArgsType } from '@nestjs/graphql';

@Resolver()
export class DeletePlantByIdResolver {
    constructor(private readonly deletePlantByIdService: DeletePlantByIdService){}

    @Mutation(() => String)
    async deletePlant(@Args('id') id: string): Promise<string>{
        return await this.deletePlantByIdService.deletePlant(id);
    }
}


