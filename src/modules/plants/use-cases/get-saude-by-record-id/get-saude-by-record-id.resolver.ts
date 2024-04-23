import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { IRelatorioSaude } from '../get-saude-by-id/relatorio-saude.types';
import { GetSaudeByIdService } from '../get-saude-by-id/get-saude-by-id.service';
import { ValidationsService } from 'src/utils/validations.service';
import { AuthGuard } from 'src/middlewares/auth/auth';
import { AuthUser } from 'src/decorators/authuser.decorator';
import { UserType } from 'src/modules/users/user.type';
import { GraphQLError } from 'graphql';

@Resolver()
export class GetSaudeByRecordIdResolver {
  constructor(
    private readonly getSaudeByIdService: GetSaudeByIdService,
    private readonly validationService: ValidationsService
    ){}

@Query(() => IRelatorioSaude)
@UseGuards(AuthGuard)
async getSaudeByRecordId(@Args('idRegistro') idRegistro: string, @AuthUser() usuario: UserType): Promise<IRelatorioSaude>{

  if(!this.validationService.isObjectId(idRegistro)) throw new GraphQLError("ID do registro inválido");

  return await this.getSaudeByIdService.getSaude(usuario, null, idRegistro);
}
}
