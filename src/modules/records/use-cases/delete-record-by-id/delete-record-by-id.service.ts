import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import prisma from 'src/database/prisma/prisma-client.ts';
import { ValidationsService } from 'src/utils/validations.service';

@Injectable()
export class DeleteRecordByIdService {
  constructor(private readonly validationsService: ValidationsService) {}

  async deleteRecord(id: string): Promise<string> {
    await prisma.$connect();

    if (id === 'TODOS') {
      await prisma.registros.deleteMany();
      return;
    }

    if (!this.validationsService.isObjectId(id))
      throw new GraphQLError('ID invalido');

    const registro = await prisma.registros.findUnique({ where: { id } });

    if (!registro) throw new GraphQLError('Registro não existe');

    await prisma.registros.delete({ where: { id } });

    await prisma.$disconnect();

    return `Registro ${registro.id} excluído com sucesso!`;
  }
}
