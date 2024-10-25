import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { UserType } from "src/modules/users/user.type";
import { Plant } from "../../plant.type";
import { GetPlantasByDonoIdArgs } from "./get-plantas-by-dono-id.args";

@Injectable()
export class GetPlantasByDonoIdService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPlanta(
    usuario: UserType,
    args: GetPlantasByDonoIdArgs,
  ): Promise<Plant[]> {
    await this.prismaService.$connect();

    const { comSimulados } = args;

    const where = comSimulados
      ? { idDono: usuario.id, dataDeExclusao: null }
      : { idDono: usuario.id, dataDeExclusao: null, simulado: false };

    const plantas = await this.prismaService.plantas.findMany({
      where,
    });

    await this.prismaService.$disconnect();

    return plantas;
  }
}
