import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Record } from '../../record.type';
import { ICreateRecordArgs } from './create-records.args';
import { CreateRecordService } from './create-record.service';

@Resolver()
export class CreateRecordResolver {

    constructor(private readonly createRecordService: CreateRecordService){}

    @Mutation(() => Record)
    async createRecord(@Args() args: ICreateRecordArgs): Promise<Record>{
        return await this.createRecordService.createRecord(args);
        
    }

}
