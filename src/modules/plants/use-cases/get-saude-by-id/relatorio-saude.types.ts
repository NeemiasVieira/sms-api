import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class IRelatorioSaude {
    @Field()
    nitrogenio: string;

    @Field()
    fosforo: string;

    @Field()
    potassio: string;

    @Field()
    umidade: string;

    @Field()
    temperatura: string;

    @Field()
    pH: string;

    @Field()
    estadoGeral: string;

    @Field()
    ultimaAtualizacao: Date;

    @Field(() => [String])
    alertas: string[];
}

export interface IRegistroPlanta {
    id: string;
    idPlanta: string;
    nitrogenio: string;
    fosforo: string;
    potassio: string;
    umidade: string;
    temperatura: string;
    pH: string;
    dataDeRegistro: Date;
}