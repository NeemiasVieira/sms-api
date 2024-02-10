import { Args, Query, Resolver } from '@nestjs/graphql';
import { Record } from '../../record.type';
import { FindAllByPlantIdService } from './find-all-by-plant-id.service';
import { IFindAllByPlantIdArgs } from './find-all-by-plant-id.types';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/middlewares/auth/auth';
import { AuthUser } from '@decorators/authuser.decorator';
import { UserType } from 'src/modules/users/user.type';

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
