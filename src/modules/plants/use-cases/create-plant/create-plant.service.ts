import { Injectable } from "@nestjs/common";
import { GraphQLError } from "graphql";
import { PrismaService } from "src/database/prisma/prisma.service";
import { Plant } from "../../plant.type";
import { CreatePlantArgs } from "./create-plant.args";

@Injectable()
export class CreatePlantService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPlant(args: CreatePlantArgs): Promise<Plant> {
    const { nome, idEspecie, usuario, simulado } = args;

    await this.prismaService.$connect();

    const dataDaPlantacao = new Date();

    const especie = await this.prismaService.especies.findUnique({
      where: { id: idEspecie },
    });

    if (!especie) {
      throw new GraphQLError("Espécie não encontrada");
    }

    const atendeOsCriteriosDeCriacao =
      (simulado && especie.simulado) || (!simulado && !especie.simulado);

    if (!atendeOsCriteriosDeCriacao) {
      throw new GraphQLError(
        "Espécie não atende os critérios de criação, verifique se a planta foi configurada como simulação",
      );
    }

    const newPlant = await this.prismaService.plantas.create({
      data: {
        idDono: usuario.id,
        nome,
        especie: especie.nome,
        idEspecie: especie.id,
        dataDaPlantacao,
        dataDeExclusao: null,
        simulado: simulado ?? false,
        solicitacaoNovoRegistro: "nenhuma",
      },
    });

    await this.prismaService.$disconnect();

    return newPlant;
  }
}
