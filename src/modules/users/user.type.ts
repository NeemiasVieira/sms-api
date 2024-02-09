import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {

  @Field()
  id?: string
  @Field()
  email: string
  @Field()
  nome: string;
  @Field()
  senha: string
  @Field()
  dataDeCriacao: Date

}
