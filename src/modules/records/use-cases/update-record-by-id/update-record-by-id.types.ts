import { ArgsType, Field } from '@nestjs/graphql';
import { IsString, IsDateString, IsNotEmpty } from 'class-validator';
import { UserType } from 'src/modules/users/user.type';

@ArgsType()
export class IUpdateRecordArgs {
  @Field(() => UserType, { nullable: true })
  usuario?: UserType;

  @Field()
  @IsNotEmpty({ message: 'O campo id é obrigatório' })
  id: string;

  @Field({ nullable: true })
  @IsString()
  idPlanta?: string;

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
  luz: string;

  @Field({ nullable: true })
  @IsString()
  lux?: string;

  @Field({ nullable: true })
  @IsString()
  nomeEspecie?: string;

  @Field({ nullable: true })
  @IsDateString()
  dataDeRegistro?: Date;

  @Field({ nullable: true })
  @IsString()
  imagem?: string;

  @Field({ nullable: true })
  @IsString()
  diagnostico?: string;
}
