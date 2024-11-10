import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetRecordsAvgService } from './get-records-avg.service';
import { GetRecordsPerMonthAvgResponse } from './get-records-avg.types';

@Resolver()
export class GetRecordsAvgResolver {
  constructor(private readonly getRecordsAvgService: GetRecordsAvgService) {}

  @Query(() => [GetRecordsPerMonthAvgResponse])
  async getRecordsPerMonthAvg(@Args('idPlanta') idPlanta: string): Promise<GetRecordsPerMonthAvgResponse[]> {
    return await this.getRecordsAvgService.execute(idPlanta);
  }
}
