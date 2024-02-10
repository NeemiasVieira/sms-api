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

@Module({
  providers: [CreatePlantResolver, CreatePlantService, DeletePlantByIdService, DeletePlantByIdResolver, GetPlantasByDonoIdResolver, GetPlantasByDonoIdService, GetSaudeByIdService, GetSaudeByIdResolver, UpdatePlantByIdService, UpdatePlantByIdResolver, ValidationsService, PrismaService]
})
export class PlantsModule {}
