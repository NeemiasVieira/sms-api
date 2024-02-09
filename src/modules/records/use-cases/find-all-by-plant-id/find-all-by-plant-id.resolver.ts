import { Args, Query, Resolver } from '@nestjs/graphql';
import { Record } from '../../record.type';
import { FindAllByPlantIdService } from './find-all-by-plant-id.service';
import { IFindAllByPlantIdArgs } from './find-all-by-plant-id.types';

@Resolver()
export class FindAllByPlantIdResolver {

    constructor(private readonly findAllByPlantIdService: FindAllByPlantIdService){}

    @Query(() => [Record])
    async getAllRecordsByPlantID(@Args() args: IFindAllByPlantIdArgs): Promise<Record[]>{
      const { idPlanta, intervaloDeDias, intervaloDeBusca } = args;
      return await this.findAllByPlantIdService.getAll(idPlanta, intervaloDeDias, intervaloDeBusca);
    }
}
