import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class Plant{
    
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
}