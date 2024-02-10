import { Field, ArgsType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@ArgsType()
export class CreatePlantArgs{
    @IsString()
    @IsNotEmpty({message: "O campo idDono é obrigatório"})
    @Field()
    idDono: string;

    @IsString()
    @IsNotEmpty({message: "O campo nome é obrigatório"})
    @Field()
    nome: string;

    @IsString()
    @IsNotEmpty({message: "O campo especie é obrigatório"})
    @Field()
    especie: string;
}