import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UserArgs {
  
  @Field()
  email: string
  @Field()
  nome: string;
  @Field()
  senha: string
  
}
