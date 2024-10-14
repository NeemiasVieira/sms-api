import { ArgsType, Field } from "@nestjs/graphql";
import { IsBoolean } from "class-validator";

@ArgsType()
export class GetAllSpeciesArgs {
  @Field({ nullable: true })
  @IsBoolean({ message: "O campo simulado precisa ser um booleano" })
  apenasSimulados?: boolean;

  @Field({ nullable: true })
  @IsBoolean({ message: "O campo simulado precisa ser um booleano" })
  comSimulados?: boolean;
}
