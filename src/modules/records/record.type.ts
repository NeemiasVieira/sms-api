import { ObjectType, Field } from "@nestjs/graphql";
@ObjectType()
export class Record{
    @Field()
    id: string;
    @Field()
    idPlanta: string;
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
    luz: string
    @Field()
    dataDeRegistro: Date;
    @Field({nullable: true})
    imagem?: string;
    @Field({nullable: true})
    diagnostico?: string
}