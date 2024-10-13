import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Logger, Module, OnApplicationBootstrap } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "./database/prisma/prisma.module";
import { PrismaService } from "./database/prisma/prisma.service";
import { AuthModule } from "./middlewares/auth/auth.module";
import { PlantsModule } from "./modules/plants/plants.module";
import { RecordsModule } from "./modules/records/records.module";
import { SpeciesModule } from "./modules/species/species.module";
import { UsersModule } from "./modules/users/users.module";
import { ExecuteOneTimeResolver } from "./utils/executeOneTime.resolver";
import { ValidationsService } from "./utils/validations.service";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      path: "/",
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      playground: false,
      csrfPrevention: false,
      introspection: true,
    }),
    JwtModule,
    UsersModule,
    AuthModule,
    AuthModule,
    PlantsModule,
    RecordsModule,
    PrismaModule,
    SpeciesModule,
  ],
  controllers: [],
  providers: [ValidationsService, PrismaService, ExecuteOneTimeResolver],
})
export class AppModule implements OnApplicationBootstrap {
  private readonly logger = new Logger("SMS-API");

  onApplicationBootstrap() {
    console.clear();
    this.logger.debug(
      "SMS-API iniciada com sucesso em http://localhost:3333 💡🚷🚀",
    );
  }
}
