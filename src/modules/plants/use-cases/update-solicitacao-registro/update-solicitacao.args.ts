import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class UpdateSolicitacaoRegistroArgs {
  @Field()
  @IsString({ message: 'O campo idPlanta precisa ser uma string' })
  @IsNotEmpty({ message: 'O campo idPlanta é obrigatório' })
  idPlanta: string;

  @Field({ nullable: true })
  @IsBoolean({ message: 'O campo nenhuma precisa ser um booleano' })
  nenhuma?: boolean;

  @Field({ nullable: true })
  @IsBoolean({ message: 'O campo aguardando precisa ser um booleano' })
  aguardando?: boolean;

  @Field({ nullable: true })
  @IsBoolean({ message: 'O campo confirmado precisa ser um booleano' })
  confirmado?: boolean;

  @Field({ nullable: true })
  @IsBoolean({ message: 'O campo solicitado precisa ser um booleano' })
  solicitado?: boolean;
}
