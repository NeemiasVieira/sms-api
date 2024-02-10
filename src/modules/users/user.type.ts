import { ObjectType, Field, InputType } from '@nestjs/graphql';

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

@InputType()
export class UserType{
  @Field()
  id: string
  @Field()
  email: string
  @Field()
  nome: string;
  @Field()
  senha: string
  @Field()
  dataDeCriacao: Date
}
