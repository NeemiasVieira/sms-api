import { Injectable } from '@nestjs/common';
import { IUpdateRecordArgs } from './update-record-by-id.types';
import { ValidationsService } from 'src/utils/validations.service';
import { GraphQLError } from 'graphql';
import prisma from 'src/database/prisma/prisma-client.ts';
import { Record } from '../../record.type';

@Injectable()
export class UpdateRecordByIdService {

    constructor(private readonly validationsService: ValidationsService){}

    async updateRecord(args: IUpdateRecordArgs): Promise<Record>{

        const {id, ...data} = args

        if(!this.validationsService.isObjectId(id)) throw new GraphQLError("ID invalido!");

        await prisma.$connect();

        const registro = await prisma.registros.findUnique({where:{id}});

        if(!registro) throw new GraphQLError("Registro não encontrado");

        const registroAtualizado = await prisma.registros.update({where: {id}, data: {
            ...data
        }})

        await prisma.$disconnect();

        return registroAtualizado;
    }
}
