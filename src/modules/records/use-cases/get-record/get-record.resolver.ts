import { Args, Query, Resolver } from '@nestjs/graphql';
import { Record } from '../../record.type';
import { GetRecordService } from './get-record.service';
import { AuthUser } from 'src/decorators/authuser.decorator';
import { UserType } from 'src/modules/users/user.type';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/middlewares/auth/auth';

@Resolver()
export class GetRecordResolver {
  constructor(private readonly getRecordService: GetRecordService) {}

  @Query(() => Record)
  @UseGuards(AuthGuard)
  async getRecord(@Args('idRecord') idRecord: string, @AuthUser() usuario: UserType): Promise<Record> {
    return await this.getRecordService.get(idRecord, usuario);
  }
}
