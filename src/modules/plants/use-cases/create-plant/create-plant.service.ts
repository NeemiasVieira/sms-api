import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Plant } from '../../plant.type';
import { CreatePlantArgs } from './create-plant.args';
import { UserType } from 'src/modules/users/user.type';

@Injectable()
export class CreatePlantService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPlant(args: CreatePlantArgs, usuario: UserType): Promise<Plant> {
    const { nome, idEspecie, simulado } = args;

    await this.prismaService.$connect();

    const dataDaPlantacao = new Date();

    const especie = await this.prismaService.especies.findUnique({
      where: { id: idEspecie },
    });

    if (!especie) {
      throw new GraphQLError('Espécie não encontrada');
    }

    const atendeOsCriteriosDeCriacao =
      (simulado && especie.simulado) || (simulado && !especie.simulado) || (!simulado && !especie.simulado);

    if (!atendeOsCriteriosDeCriacao) {
      throw new GraphQLError(
        'Espécie não atende aos critérios, uma planta não simulada deve ser criada com uma espécie oficial, selecione outra espécie.'
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
        solicitacaoNovoRegistro: 'nenhuma',
      },
    });

    await this.prismaService.$disconnect();

    return newPlant;
  }
}
