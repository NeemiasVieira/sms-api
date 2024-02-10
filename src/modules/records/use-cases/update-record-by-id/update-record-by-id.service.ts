import { Injectable } from '@nestjs/common';
import { IUpdateRecordArgs } from './update-record-by-id.types';
import { ValidationsService } from 'src/utils/validations.service';
import { GraphQLError } from 'graphql';
import { Record } from '../../record.type';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UserType } from 'src/modules/users/user.type';

@Injectable()
export class UpdateRecordByIdService {

    constructor(private readonly validationsService: ValidationsService, private readonly prismaService: PrismaService){}

    async updateRecord(args: IUpdateRecordArgs): Promise<Record>{

        const {id, usuario, ...data} = args

        if(!this.validationsService.isObjectId(id)) throw new GraphQLError("ID invalido!");

        await this.prismaService.$connect();

        const registro = await this.prismaService.registros.findUnique({where:{id}});

        if(!registro) throw new GraphQLError("Registro não encontrado");

        const planta = await this.prismaService.plantas.findUnique({where: {id: registro.idPlanta}});

        if(planta.idDono !== args.usuario.id) throw new GraphQLError("Usuário não autorizado");

        const registroAtualizado = await this.prismaService.registros.update({where: {id}, data: {
            ...data
        }})

        await this.prismaService.$disconnect();

        return registroAtualizado;
    }
}
