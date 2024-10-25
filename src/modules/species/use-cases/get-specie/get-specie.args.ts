import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class GetSpecieArgs {
  @Field({ nullable: false })
  @IsString({ message: 'O Campo id precisa ser uma string' })
  id: string;
}
