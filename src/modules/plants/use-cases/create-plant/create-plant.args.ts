import { Field, ArgsType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";
import { UserType } from "src/modules/users/user.type";

@ArgsType()
export class CreatePlantArgs {
  @IsString()
  @Field(() => UserType, { nullable: true })
  usuario: UserType;

  @IsString()
  @IsNotEmpty({ message: "O campo nome é obrigatório" })
  @Field()
  nome: string;

  @IsString()
  @IsNotEmpty({ message: "O campo especie é obrigatório" })
  @Field()
  especie: string;
}
