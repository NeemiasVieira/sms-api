import { Args, Query, Resolver } from '@nestjs/graphql';
import { Record } from '../../record.type';
import { FindAllByPlantIdService } from './find-all-by-plant-id.service';
import { IFindAllByPlantIdArgs } from './find-all-by-plant-id.types';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/middlewares/auth/auth';
import { UserType } from 'src/modules/users/user.type';
import { AuthUser } from 'src/decorators/authuser.decorator';

@Resolver()
export class FindAllByPlantIdResolver {

    constructor(private readonly findAllByPlantIdService: FindAllByPlantIdService){}

    @Query(() => [Record])
    @UseGuards(AuthGuard)
    async getAllRecordsByPlant(@Args() args: IFindAllByPlantIdArgs, @AuthUser() usuario: UserType): Promise<Record[]>{
      args.usuario = usuario;
      return await this.findAllByPlantIdService.getAll(args);
    }
}
