import { Args, Query, Resolver } from '@nestjs/graphql';
import { IGetAllRecordsPaginatedArgs, IGetAllRecordsPaginatedResponse } from './get-all-records-paginated.types';
import { AuthUser } from 'src/decorators/authuser.decorator';
import { UserType } from 'src/modules/users/user.type';
import { GetAllRecordsPaginatedService } from './get-all-records-paginated.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/middlewares/auth/auth';

@Resolver()
export class GetAllRecordsPaginatedResolver {
  constructor(private readonly getAllRecordsPaginatedService: GetAllRecordsPaginatedService) {}

  @UseGuards(AuthGuard)
  @Query(() => IGetAllRecordsPaginatedResponse)
  async getAllRecordsPaginated(
    @Args() args: IGetAllRecordsPaginatedArgs,
    @AuthUser() usuario: UserType,
  ): Promise<IGetAllRecordsPaginatedResponse> {
    return await this.getAllRecordsPaginatedService.get(args, usuario);
  }
}
