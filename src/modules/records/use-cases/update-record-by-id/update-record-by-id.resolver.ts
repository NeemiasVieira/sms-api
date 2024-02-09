import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Record } from '../../record.type';
import { IUpdateRecordArgs } from './update-record-by-id.types';
import { UpdateRecordByIdService } from './update-record-by-id.service';

@Resolver()
export class UpdateRecordByIdResolver {

    constructor(private readonly updateRecordByIdService: UpdateRecordByIdService){}

    @Mutation(() => Record)
    async updateRecord(@Args() args: IUpdateRecordArgs): Promise<Record>{
        return await this.updateRecordByIdService.updateRecord(args);
    }
}
