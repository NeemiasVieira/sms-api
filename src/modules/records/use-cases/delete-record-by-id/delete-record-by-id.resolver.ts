import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { DeleteRecordByIdService } from './delete-record-by-id.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/middlewares/auth/auth';
import { UserType } from 'src/modules/users/user.type';
import { AuthUser } from 'src/decorators/authuser.decorator';

@Resolver()
export class DeleteRecordByIdResolver {

    constructor(private readonly deleteRecordByIdService: DeleteRecordByIdService){}

    @Mutation(() => String)
    @UseGuards(AuthGuard)
    async deleteRecord(@Args('id') id: string, @AuthUser() usuario: UserType): Promise<string>{
        return await this.deleteRecordByIdService.deleteRecord(id, usuario);
    }
}
