import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
class RecordAverage {
  @Field(() => Float)
  nitrogenio: number;

  @Field(() => Float)
  fosforo: number;

  @Field(() => Float)
  potassio: number;

  @Field(() => Float)
  umidade: number;

  @Field(() => Float)
  temperatura: number;

  @Field(() => Float)
  pH: number;

  @Field(() => Float)
  luz: number;

  @Field(() => Float)
  lux: number;
}

@ObjectType()
export class GetRecordsPerMonthAvgResponse {
  @Field(() => String)
  mesAno: string;

  @Field(() => RecordAverage)
  medias: RecordAverage;
}
