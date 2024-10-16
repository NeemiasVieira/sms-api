import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UserType } from 'src/modules/users/user.type';
import { Record } from '../../record.type';

@Injectable()
export class GetUltimoRegistroPlantaService {
  constructor(private readonly prismaService: PrismaService) {}

  async getRecord(id: string, usuario: UserType): Promise<Record> {
    await this.prismaService.$connect();

    const plantaExiste = await this.prismaService.plantas.findUnique({
      where: { id, dataDeExclusao: null },
    });

    if (!plantaExiste) throw new GraphQLError('Planta não encontrada');

    if (plantaExiste.idDono !== usuario.id) throw new GraphQLError('Usuário não autorizado');

    const ultimoRegistro = await this.prismaService.registros.findFirst({
      where: { idPlanta: id, dataDeExclusao: null },
      orderBy: { dataDeRegistro: 'desc' },
    });

    await this.prismaService.$disconnect();

    return ultimoRegistro;
  }
}
