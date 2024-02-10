import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Record } from '../../record.type';
import { ICreateRecordArgs } from './create-records.args';
import { CreateRecordService } from './create-record.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/middlewares/auth/auth';
import { AuthUser } from 'src/decorators/AuthUser.decorator';
import { UserType } from 'src/modules/users/user.type';

@Resolver()
export class CreateRecordResolver {

    constructor(private readonly createRecordService: CreateRecordService){}

    @Mutation(() => Record)
    @UseGuards(AuthGuard)
    async createRecord(@Args() args: ICreateRecordArgs, @AuthUser() usuario: UserType): Promise<Record>{
        args.usuario = usuario;
        return await this.createRecordService.createRecord(args);
        
    }

}
