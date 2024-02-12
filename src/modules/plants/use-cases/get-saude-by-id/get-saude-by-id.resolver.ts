import { Resolver, Query, Args} from '@nestjs/graphql';
import { GetSaudeByIdService } from './get-saude-by-id.service';
import { IRelatorioSaude } from './relatorio-saude.types';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/middlewares/auth/auth';
import { UserType } from 'src/modules/users/user.type';
import { AuthUser } from 'src/decorators/authuser.decorator';

@Resolver()
export class GetSaudeByIdResolver {
    constructor(private readonly getSaudeByIdService: GetSaudeByIdService){}

    @Query(() => IRelatorioSaude)
    @UseGuards(AuthGuard)
    async getSaudeByPlantId(@Args('idPlanta') idPlanta: string, @AuthUser() usuario: UserType): Promise<IRelatorioSaude>{
        return await this.getSaudeByIdService.getSaude(idPlanta, usuario);
    }
}
