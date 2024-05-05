import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetSolicitacaoRegistroService } from './get-solicitacao-registro.service';
import { AuthUser } from 'src/decorators/authuser.decorator';
import { UserType } from 'src/modules/users/user.type';
import { ISolicitacaoNovoRegistro } from '../../plant.type';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/middlewares/auth/auth';

@Resolver()
export class GetSolicitacaoRegistroResolver {
  constructor(private readonly getSolicitacaoRegistroService: GetSolicitacaoRegistroService) {}

  @Query(() => String)
  @UseGuards(AuthGuard)
  async getSolicitacaoRegistro(
    @Args('idPlanta') idPlanta: string,
    @AuthUser() usuario: UserType,
  ): Promise<ISolicitacaoNovoRegistro> {
    return await this.getSolicitacaoRegistroService.get(idPlanta, usuario);
  }
}
