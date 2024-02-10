import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './middlewares/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PlantsModule } from './modules/plants/plants.module';
import { ValidationsService } from './utils/validations.service';
import { RecordsModule } from './modules/records/records.module';
import { PrismaService } from './database/prisma/prisma.service';
import { PrismaModule } from './database/prisma/prisma.module';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: true,
    path: "/",
    playground: true,
    csrfPrevention: false,
    introspection: true,
    
  }), JwtModule, UsersModule, AuthModule, AuthModule, PlantsModule, RecordsModule, PrismaModule
],
  controllers: [],
  providers: [ValidationsService, PrismaService],
})
export class AppModule implements OnApplicationBootstrap {
  private readonly logger = new Logger('SMS-API');

  onApplicationBootstrap() {
    console.clear();
    this.logger.debug('SMS-API iniciada com sucesso em http://localhost:3333 💡🚷🚀');
  }
}
