import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class CreatePlantArgs {
  @IsString()
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  @Field()
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo especie é obrigatório' })
  @Field()
  idEspecie: string;

  @IsBoolean()
  @Field()
  simulado?: boolean;
}
