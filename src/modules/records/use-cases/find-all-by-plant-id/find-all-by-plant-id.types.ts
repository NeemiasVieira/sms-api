import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@ArgsType()
export class IFindAllByPlantIdArgs {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'O campo idPlanta é obrigatório' })
  idPlanta: string;

  @Field({ nullable: true })
  @IsNumber()
  intervaloDeBusca?: number;
}
