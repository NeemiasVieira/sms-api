import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";


@InputType()
export class UParametro {
  @Field({nullable: true})
  @IsString({ message: "O campo min precisa ser uma string" })
  min?: string;

  @Field({nullable: true})
  @IsString({ message: "O campo max precisa ser uma string" })
  max?: string;
}


@InputType()
export class UParametros {
  @Field(() => UParametro, {nullable: true})
  nitrogenio?: UParametro;

  @Field(() => UParametro, {nullable: true})
  fosforo?: UParametro;

  @Field(() => UParametro, {nullable: true})
  potassio?: UParametro;

  @Field(() => UParametro, {nullable: true})
  luz?: UParametro;

  @Field(() => UParametro, {nullable: true})
  umidade?: UParametro;

  @Field(() => UParametro, {nullable: true})
  temperatura?: UParametro;

  @Field(() => UParametro, {nullable: true})
  pH?: UParametro;
}

@ArgsType()
export class UpdateSpecieArgs {

  @Field({nullable: false})
  id: string;

  @Field({nullable: true})
  @IsString({ message: "O campo nome precisa ser uma string" })
  nome?: string;

  @Field({nullable: true})
  @IsString({ message: "O campo descricao precisa ser uma string" })
  descricao?: string;

  @Field(() => UParametros, {nullable: true})
  parametros?: UParametros;
}


