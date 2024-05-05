import { Module } from '@nestjs/common';
import { CreatePlantResolver } from './use-cases/create-plant/create-plant.resolver';
import { CreatePlantService } from './use-cases/create-plant/create-plant.service';
import { DeletePlantByIdService } from './use-cases/delete-plant-by-id/delete-plant-by-id.service';
import { DeletePlantByIdResolver } from './use-cases/delete-plant-by-id/delete-plant-by-id.resolver';
import { GetPlantasByDonoIdResolver } from './use-cases/get-plantas-by-dono-id/get-plantas-by-dono-id.resolver';
import { GetPlantasByDonoIdService } from './use-cases/get-plantas-by-dono-id/get-plantas-by-dono-id.service';
import { GetSaudeByIdService } from './use-cases/get-saude-by-id/get-saude-by-id.service';
import { GetSaudeByIdResolver } from './use-cases/get-saude-by-id/get-saude-by-id.resolver';
import { UpdatePlantByIdService } from './use-cases/update-plant-by-id/update-plant-by-id.service';
import { UpdatePlantByIdResolver } from './use-cases/update-plant-by-id/update-plant-by-id.resolver';
import { ValidationsService } from 'src/utils/validations.service';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { SpecieMapper } from '../species/specie-mapper.service';
import { GetSaudeByRecordIdResolver } from './use-cases/get-saude-by-record-id/get-saude-by-record-id.resolver';
import { UpdateSolicitacaoRegistroResolver } from './use-cases/update-solicitacao-registro/update-solicitacao-registro.resolver';
import { UpdateSolicitacaoRegistroService } from './use-cases/update-solicitacao-registro/update-solicitacao-registro.service';
import { GetSolicitacaoRegistroResolver } from './use-cases/get-solicitacao-registro/get-solicitacao-registro.resolver';
import { GetSolicitacaoRegistroService } from './use-cases/get-solicitacao-registro/get-solicitacao-registro.service';
import { GetPlantResolver } from './use-cases/get-plant/get-plant.resolver';
import { GetPlantService } from './use-cases/get-plant/get-plant.service';

@Module({
  imports: [JwtModule],
  providers: [
    CreatePlantResolver,
    CreatePlantService,
    DeletePlantByIdService,
    DeletePlantByIdResolver,
    GetPlantasByDonoIdResolver,
    GetPlantasByDonoIdService,
    GetSaudeByIdService,
    GetSaudeByIdResolver,
    UpdatePlantByIdService,
    UpdatePlantByIdResolver,
    ValidationsService,
    PrismaService,
    SpecieMapper,
    GetSaudeByRecordIdResolver,
    UpdateSolicitacaoRegistroResolver,
    UpdateSolicitacaoRegistroService,
    GetSolicitacaoRegistroResolver,
    GetSolicitacaoRegistroService,
    GetPlantResolver,
    GetPlantService,
  ],
})
export class PlantsModule {}
