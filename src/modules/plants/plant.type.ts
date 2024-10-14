import { Field, ObjectType } from "@nestjs/graphql";

export type ISolicitacaoNovoRegistro = "aguardando" | "confirmado" | "nenhuma";

@ObjectType()
export class Plant {
  @Field()
  id: string;

  @Field()
  idDono: string;

  @Field()
  nome: string;

  @Field()
  especie: string;

  @Field()
  dataDaPlantacao: Date;

  @Field()
  solicitacaoNovoRegistro: ISolicitacaoNovoRegistro;

  @Field()
  ultimaAtualizacao?: Date;

  @Field()
  simulado?: boolean;

  @Field()
  dataDeExclusao?: Date;

  @Field()
  idEspecie: string;
}
