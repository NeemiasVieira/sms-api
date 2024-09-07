import { Injectable } from "@nestjs/common";
import { Plant } from "../../plant.type";
import { ValidationsService } from "src/utils/validations.service";
import { PrismaService } from "src/database/prisma/prisma.service";
import { UserType } from "src/modules/users/user.type";

@Injectable()
export class GetPlantasByDonoIdService {
  constructor(
    private readonly validationsService: ValidationsService,
    private readonly prismaService: PrismaService
  ) {}

  async getPlanta(usuario: UserType): Promise<Plant[]> {
    await this.prismaService.$connect();

    const plantas = await this.prismaService.plantas.findMany({ where: { idDono: usuario.id } });

    await this.prismaService.$disconnect();

    return plantas;
  }
}
