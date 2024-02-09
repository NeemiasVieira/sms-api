import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { DeleteRecordByIdService } from './delete-record-by-id.service';

@Resolver()
export class DeleteRecordByIdResolver {

    constructor(private readonly deleteRecordByIdService: DeleteRecordByIdService){}

    @Mutation(() => String)
    async deleteRecordById(@Args('id') id: string): Promise<string>{
        return await this.deleteRecordByIdService.deleteRecord(id);
    }
}
