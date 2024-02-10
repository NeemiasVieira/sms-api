import { Injectable } from '@nestjs/common';
import { Plant } from '../../plant.type';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreatePlantArgs } from './create-plant.args';

@Injectable()
export class CreatePlantService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPlant(args: CreatePlantArgs): Promise<Plant> {
    const { nome, especie, usuario } = args;

    await this.prismaService.$connect();

    const dataDaPlantacao = new Date();

    const newPlant = await this.prismaService.plantas.create({
      data: {
        idDono: usuario.id,
        nome,
        especie,
        dataDaPlantacao,
      },
    });

    await this.prismaService.$disconnect();

    return newPlant;
  }
}
