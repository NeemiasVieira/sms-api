import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { IsString, IsNotEmpty } from "class-validator";

@InputType()
export class IPlantaAtualizada{
    @Field({ nullable: true })
    nome?: string
    @Field({ nullable: true })
    especie?: string
}

@ArgsType()
export class IUpdatePlantArgs{
    @Field()
    @IsString()
    @IsNotEmpty({message: "O campo idDono é obrigatório"})
    id: string
    @Field(() => IPlantaAtualizada)
    plantaAtualizada: IPlantaAtualizada
}