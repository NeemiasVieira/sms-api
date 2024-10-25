import { Resolver, Query, Args } from '@nestjs/graphql';
import { GetSaudeByIdService } from './get-saude-by-id.service';
import { IRelatorioSaude } from './relatorio-saude.types';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/middlewares/auth/auth';
import { UserType } from 'src/modules/users/user.type';
import { AuthUser } from 'src/decorators/authuser.decorator';
import { ValidationsService } from 'src/utils/validations.service';
import { GraphQLError } from 'graphql';

@Resolver()
export class GetSaudeByIdResolver {
  constructor(
    private readonly getSaudeByIdService: GetSaudeByIdService,
    private readonly validationService: ValidationsService
  ) {}

  @Query(() => IRelatorioSaude, { nullable: true })
  @UseGuards(AuthGuard)
  async getSaudeByPlantId(@Args('idPlanta') idPlanta: string, @AuthUser() usuario: UserType): Promise<IRelatorioSaude> {
    if (!this.validationService.isObjectId(idPlanta)) throw new GraphQLError('ID da planta inválido');

    return await this.getSaudeByIdService.getSaude(usuario, idPlanta);
  }
}
