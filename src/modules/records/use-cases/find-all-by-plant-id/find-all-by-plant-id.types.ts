import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserType } from 'src/modules/users/user.type';

@ArgsType()
export class IFindAllByPlantIdArgs {
  @Field(() => UserType, { nullable: true })
  usuario?: UserType;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'O campo idPlanta é obrigatório' })
  idPlanta: string;

  @Field({ nullable: true })
  @IsNumber()
  intervaloDeDias?: number;

  @Field({ nullable: true })
  @IsNumber()
  intervaloDeBusca?: number;
}
