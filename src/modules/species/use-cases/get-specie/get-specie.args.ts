import { ArgsType, Field } from "@nestjs/graphql";
import { IsString } from "class-validator";

@ArgsType()
export class GetSpecieArgs{
  @Field({nullable: true})
  @IsString({message: "O Campo id precisa ser uma string"})
  id?: string;
  @Field({nullable: true})
  @IsString({message: "O Campo nome precisa ser uma string"})
  nome?: string;
}