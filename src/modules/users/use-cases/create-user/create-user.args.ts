import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateUserArgs {
  
  @Field()
  email: string
  @Field()
  nome: string;
  @Field()
  senha: string
  
}
