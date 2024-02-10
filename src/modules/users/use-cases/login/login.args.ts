import { IsEmail, IsNotEmpty } from 'class-validator';
import { ArgsType, Field, ObjectType} from '@nestjs/graphql';
import { User } from '../../user.type';

@ArgsType()
export class LoginUserArgs {

  @IsEmail({}, {message: "O e-mail precisa ser válido"})
  @IsNotEmpty({message: "O campo email é obrigatório."})
  @Field()
  email: string;

  @IsNotEmpty({message: "O campo senha é obrigatório."})
  @Field()
  senha: string;
}

@ObjectType()
export class ILoginUserResponse {

  @Field({description: "Uma mensagem de resposta da requisição"})
  resposta: string
  @Field()
  usuario: User
  @Field()
  token: string;

}

@ObjectType()
export class IAuthorization{
  @Field()
  Authorization: string;
}


