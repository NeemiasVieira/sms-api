import { Module } from "@nestjs/common";
import { CreateSpecieResolver } from "./use-cases/create-specie/create-specie.resolver";
import { DeleteSpecieResolver } from "./use-cases/delete-specie/delete-specie.resolver";
import { UpdateSpecieResolver } from "./use-cases/update-specie/update-specie.resolver";
import { GetAllSpeciesResolver } from "./use-cases/get-all-species/get-all-species.resolver";
import { GetSpecieResolver } from "./use-cases/get-specie/get-specie.resolver";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "src/database/prisma/prisma.service";
import { SpecieMapper } from "./specie-mapper.service";
import { ValidationsService } from "src/utils/validations.service";

@Module({
  imports: [JwtModule],
  providers: [
    CreateSpecieResolver,
    DeleteSpecieResolver,
    UpdateSpecieResolver,
    GetAllSpeciesResolver,
    GetSpecieResolver,
    PrismaService,
    SpecieMapper,
    ValidationsService,
  ],
})
export class SpeciesModule {}
