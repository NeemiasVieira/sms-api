import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

@ArgsType()
export class IGetAllRecordsPaginatedArgs{
    @Field()
    @IsString()
    @IsNotEmpty({message: "O campo idPlanta é obrigatório"})
    idPlanta: string

    @Field()
    @IsNotEmpty({message: "O campo registrosPorPag é obrigatório"})
    @IsNumber({}, {message: "O campo registrosPorPag precisa ser um número"})
    registrosPorPag: number;

    @Field({nullable: true})
    @IsDateString()
    dataDeInicioBusca?: Date

    @Field({nullable: true})
    @IsDateString()
    dataDeFimBusca?: Date

    @Field()
    @IsNumber({}, {message: "A propriedade pagina deve ser um número"})
    @IsNotEmpty({message: "A propriedade pagina é obrigatória"})
    pagina: number;

}

@ObjectType()
 export class RecordPaginated{
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
    @Field()
    nuRegistro: number;
}

@ObjectType()
export class IGetAllRecordsPaginatedResponse{
  @Field((type) => [RecordPaginated])
  registros: RecordPaginated[];
  @Field()
  pagina: number;
  @Field()
  totalPaginas: number;
}