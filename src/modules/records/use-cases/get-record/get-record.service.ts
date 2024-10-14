import { Injectable } from "@nestjs/common";
import { GraphQLError } from "graphql";
import { PrismaService } from "src/database/prisma/prisma.service";
import { UserType } from "src/modules/users/user.type";
import { ValidationsService } from "src/utils/validations.service";
import { Record } from "../../record.type";

@Injectable()
export class GetRecordService {
  constructor(
    private readonly validateId: ValidationsService,
    private readonly prisma: PrismaService,
  ) {}

  async get(idRegistro: string, usuario: UserType): Promise<Record> {
    if (!this.validateId.isObjectId(idRegistro))
      throw new GraphQLError("O ID do registro é inválido");

    await this.prisma.$connect();

    const registro = await this.prisma.registros.findUnique({
      where: { id: idRegistro, dataDeExclusao: null },
    });

    if (!registro)
      throw new GraphQLError("O registro não foi encontrado no sistema");

    const planta = await this.prisma.plantas.findUnique({
      where: { id: registro.idPlanta, dataDeExclusao: null },
    });

    if (!planta) throw new GraphQLError("Planta do registro não encontrada");

    if (planta.idDono !== usuario.id)
      throw new GraphQLError("Usuário não autorizado");

    await this.prisma.$disconnect();

    return registro;
  }
}
