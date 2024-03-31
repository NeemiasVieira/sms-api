import { ObjectType, Field, InputType, ArgsType } from '@nestjs/graphql';

@ObjectType()
class Parametro{
  @Field()
  min: string;
  @Field()
  max: string;
}

@ObjectType()
class Parametros{
  @Field((type) => Parametro)
  nitrogenio: Parametro;
  @Field((type) => Parametro)
  fosforo: Parametro;
  @Field((type) => Parametro)
  potassio: Parametro;
  @Field((type) => Parametro)
  luz: Parametro;
  @Field((type) => Parametro)
  umidade: Parametro;
  @Field((type) => Parametro)
  temperatura: Parametro;
  @Field((type) => Parametro)
  pH: Parametro;
}

@ObjectType()
export class Specie {

  @Field()
  id: string;

  @Field()
  nome: string

  @Field()
  descricao: string;

  @Field((type) => Parametros)
  parametros: Parametros;
}



