import { Args, Resolver, Query } from '@nestjs/graphql';
import { Record } from '../../record.type';
import { GetUltimoRegistroPlantaService } from './get-ultimo-registro-planta.service';

@Resolver()
export class GetUltimoRegistroPlantaResolver {

    constructor(private readonly getUltimoRegistroPlantaService: GetUltimoRegistroPlantaService){}

    @Query(() => Record)
    async getLastRecord(@Args('idPlanta') idPlanta: string): Promise<Record>{
        return await this.getUltimoRegistroPlantaService.getRecord(idPlanta);
    }
}
