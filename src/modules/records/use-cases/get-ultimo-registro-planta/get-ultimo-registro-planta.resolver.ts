import { Args, Resolver, Query } from '@nestjs/graphql';
import { Record } from '../../record.type';
import { GetUltimoRegistroPlantaService } from './get-ultimo-registro-planta.service';
import { UserType } from 'src/modules/users/user.type';
import { AuthGuard } from 'src/middlewares/auth/auth';
import { UseGuards } from '@nestjs/common';
import { AuthUser } from 'src/decorators/authuser.decorator';

@Resolver()
export class GetUltimoRegistroPlantaResolver {
  constructor(private readonly getUltimoRegistroPlantaService: GetUltimoRegistroPlantaService) {}

  @Query(() => Record, { nullable: true })
  @UseGuards(AuthGuard)
  async getLastRecordByPlant(@Args('idPlanta') idPlanta: string, @AuthUser() usuario: UserType): Promise<Record> {
    return await this.getUltimoRegistroPlantaService.getRecord(idPlanta, usuario);
  }
}
