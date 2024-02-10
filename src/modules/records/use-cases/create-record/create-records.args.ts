import { ArgsType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@ArgsType()
export class ICreateRecordArgs {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'O campo idPlanta é obrigatório' })
  idPlanta: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'O campo nitrogenio é obrigatório' })
  nitrogenio: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'O campo fosforo é obrigatório' })
  fosforo: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'O campo potassio é obrigatório' })
  potassio: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'O campo umidade é obrigatório' })
  umidade: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'O campo temperatura é obrigatório' })
  temperatura: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'O campo pH é obrigatório' })
  pH: string;
}
