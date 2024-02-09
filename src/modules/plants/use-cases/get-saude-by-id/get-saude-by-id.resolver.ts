import { Resolver, Query, Args} from '@nestjs/graphql';
import { GetSaudeByIdService } from './get-saude-by-id.service';
import { IRelatorioSaude } from './relatorio-saude.types';

@Resolver()
export class GetSaudeByIdResolver {
    constructor(private readonly getSaudeByIdService: GetSaudeByIdService){}

    @Query(() => IRelatorioSaude)
    async getSaudeByPlantId(@Args('idPlanta') idPlanta: string): Promise<IRelatorioSaude>{
        return await this.getSaudeByIdService.getSaude(idPlanta);
    }
}
