import { Args, Query, Resolver } from '@nestjs/graphql';
import { GeneratePdfService } from './generate-pdf.service';
import { AuthUser } from '../../../../decorators/authuser.decorator';
import { UserType } from '../../../users/user.type';
import { ValidationsService } from '../../../../utils/validations.service';
import { GraphQLError } from 'graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/middlewares/auth/auth';

@Resolver()
export class GeneratePdfResolver {
  constructor(
    private readonly pdfService: GeneratePdfService,
    private readonly validationService: ValidationsService,
  ) {}

  @UseGuards(AuthGuard)
  @Query(() => String)
  async generatePdf(@AuthUser() usuario: UserType, @Args('recordId') recordId: string): Promise<string> {
    if (!this.validationService.isObjectId(recordId)) throw new GraphQLError('O recordId não é um ID válido');

    return await this.pdfService.generate(recordId, usuario);
  }
}
