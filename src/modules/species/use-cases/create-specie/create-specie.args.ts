import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class IParametro {
  @Field({ nullable: false })
  @IsString({ message: "O campo min precisa ser uma string" })
  min: string;

  @Field({ nullable: false })
  @IsString({ message: "O campo max precisa ser uma string" })
  max: string;
}

@InputType()
export class IParametros {
  @Field(() => IParametro, { nullable: false })
  @IsNotEmpty({ message: "O campo nitrogenio não pode estar vazio" })
  nitrogenio: IParametro;

  @Field(() => IParametro, { nullable: false })
  @IsNotEmpty({ message: "O campo fosforo não pode estar vazio" })
  fosforo: IParametro;

  @Field(() => IParametro, { nullable: false })
  @IsNotEmpty({ message: "O campo potassio não pode estar vazio" })
  potassio: IParametro;

  @Field(() => IParametro, { nullable: false })
  @IsNotEmpty({ message: "O campo luz não pode estar vazio" })
  luz: IParametro;

  @Field(() => IParametro, { nullable: false })
  @IsNotEmpty({ message: "O campo umidade não pode estar vazio" })
  umidade: IParametro;

  @Field(() => IParametro, { nullable: false })
  @IsNotEmpty({ message: "O campo temperatura não pode estar vazio" })
  temperatura: IParametro;

  @Field(() => IParametro, { nullable: false })
  @IsNotEmpty({ message: "O campo pH não pode estar vazio" })
  pH: IParametro;
}

@ArgsType()
export class CreateSpecieArgs {
  @Field({ nullable: false })
  @IsString({ message: "O campo nome precisa ser uma string" })
  nome: string;

  @Field({ nullable: false })
  @IsString({ message: "O campo descricao precisa ser uma string" })
  descricao: string;

  @Field(() => IParametros, { nullable: false })
  parametros: IParametros;

  @Field({ nullable: true })
  @IsBoolean({ message: "O campo simulado precisa ser um booleano" })
  simulado?: boolean;
}
