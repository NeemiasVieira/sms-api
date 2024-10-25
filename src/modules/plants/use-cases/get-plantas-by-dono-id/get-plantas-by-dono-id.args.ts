import { ArgsType, Field } from "@nestjs/graphql";
import { IsBoolean } from "class-validator";

@ArgsType()
export class GetPlantasByDonoIdArgs {
  @Field({ nullable: true })
  @IsBoolean({ message: "O campo simulado precisa ser um booleano" })
  comSimulados?: boolean;
}
