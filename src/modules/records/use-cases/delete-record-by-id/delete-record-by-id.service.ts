import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UserType } from 'src/modules/users/user.type';
import { ValidationsService } from 'src/utils/validations.service';

@Injectable()
export class DeleteRecordByIdService {
  constructor(private readonly validationsService: ValidationsService, private readonly prismaService: PrismaService) {}

  async deleteRecord(id: string, usuario: UserType): Promise<string> {
    await this.prismaService.$connect();

    if (id === 'TODOS') {
      await this.prismaService.registros.deleteMany();
      return;
    }

    if (!this.validationsService.isObjectId(id))
      throw new GraphQLError('ID invalido');

    const registro = await this.prismaService.registros.findUnique({ where: { id } });

    if (!registro) throw new GraphQLError('Registro não existe');

    const planta = await this.prismaService.plantas.findUnique({where: {id: registro.idPlanta}});

    if(planta.idDono !== usuario.id) throw new GraphQLError("Usuário não autorizado");

    await this.prismaService.registros.delete({ where: { id } });

    await this.prismaService.$disconnect();

    return `Registro ${registro.id} excluído com sucesso!`;
  }
}
