import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
class Parametro {
  @Field()
  min: string;
  @Field()
  max: string;
}

@ObjectType()
class Parametros {
  @Field(() => Parametro)
  nitrogenio: Parametro;
  @Field(() => Parametro)
  fosforo: Parametro;
  @Field(() => Parametro)
  potassio: Parametro;
  @Field(() => Parametro)
  luz: Parametro;
  @Field(() => Parametro)
  umidade: Parametro;
  @Field(() => Parametro)
  temperatura: Parametro;
  @Field(() => Parametro)
  pH: Parametro;
}

@ObjectType()
export class Specie {
  @Field()
  id: string;

  @Field()
  nome: string;

  @Field()
  descricao: string;

  @Field(() => Parametros)
  parametros: Parametros;
}
