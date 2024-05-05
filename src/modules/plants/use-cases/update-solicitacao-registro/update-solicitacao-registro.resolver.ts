import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UpdateSolicitacaoRegistroService } from './update-solicitacao-registro.service';
import { UpdateSolicitacaoRegistroArgs } from './update-solicitacao.args';
import { AuthUser } from 'src/decorators/authuser.decorator';
import { UserType } from 'src/modules/users/user.type';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/middlewares/auth/auth';
import { Plant } from '../../plant.type';

@Resolver()
export class UpdateSolicitacaoRegistroResolver {
  constructor(private readonly updateSolicitacaoService: UpdateSolicitacaoRegistroService) {}

  @Mutation(() => Plant)
  @UseGuards(AuthGuard)
  async updateSolicitacaoRegistro(
    @Args() args: UpdateSolicitacaoRegistroArgs,
    @AuthUser() usuario: UserType,
  ): Promise<Plant> {
    return await this.updateSolicitacaoService.update(args, usuario);
  }
}
