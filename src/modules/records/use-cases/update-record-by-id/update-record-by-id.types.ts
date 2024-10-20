import { ArgsType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@ArgsType()
export class IUpdateRecordArgs {
  @Field()
  @IsNotEmpty({ message: 'O campo id é obrigatório' })
  id: string;

  @Field({ nullable: true })
  @IsString()
  nitrogenio?: string;

  @Field({ nullable: true })
  @IsString()
  fosforo?: string;

  @Field({ nullable: true })
  @IsString()
  potassio?: string;

  @Field({ nullable: true })
  @IsString()
  umidade?: string;

  @Field({ nullable: true })
  @IsString()
  temperatura?: string;

  @Field({ nullable: true })
  @IsString()
  pH?: string;

  @Field({ nullable: true })
  @IsString()
  lux?: string;

  @Field({ nullable: true })
  @IsString()
  imagem?: string;

  @Field({ nullable: true })
  @IsString()
  diagnostico?: string;
}
