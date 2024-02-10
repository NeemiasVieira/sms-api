import { Injectable } from '@nestjs/common';
import { IUpdateRecordArgs } from './update-record-by-id.types';
import { ValidationsService } from 'src/utils/validations.service';
import { GraphQLError } from 'graphql';
import { Record } from '../../record.type';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class UpdateRecordByIdService {

    constructor(private readonly validationsService: ValidationsService, private readonly prismaService: PrismaService){}

    async updateRecord(args: IUpdateRecordArgs): Promise<Record>{

        const {id, ...data} = args

        if(!this.validationsService.isObjectId(id)) throw new GraphQLError("ID invalido!");

        await this.prismaService.$connect();

        const registro = await this.prismaService.registros.findUnique({where:{id}});

        if(!registro) throw new GraphQLError("Registro não encontrado");

        const registroAtualizado = await this.prismaService.registros.update({where: {id}, data: {
            ...data
        }})

        await this.prismaService.$disconnect();

        return registroAtualizado;
    }
}
