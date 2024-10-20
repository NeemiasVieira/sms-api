import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Record } from '../../record.type';
import { IUpdateRecordArgs } from './update-record-by-id.types';
import { UpdateRecordByIdService } from './update-record-by-id.service';
import { UserType } from 'src/modules/users/user.type';
import { AuthGuard } from 'src/middlewares/auth/auth';
import { UseGuards } from '@nestjs/common';
import { AuthUser } from 'src/decorators/authuser.decorator';

@Resolver()
export class UpdateRecordByIdResolver {
  constructor(private readonly updateRecordByIdService: UpdateRecordByIdService) {}

  @Mutation(() => Record)
  @UseGuards(AuthGuard)
  async updateRecord(@Args() args: IUpdateRecordArgs, @AuthUser() usuario: UserType): Promise<Record> {
    return await this.updateRecordByIdService.updateRecord(args, usuario);
  }
}
