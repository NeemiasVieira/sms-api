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
import { ExecuteOneTimeResolver } from './utils/executeOneTime.resolver';
import { SpeciesModule } from './modules/species/species.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: true,
    path: "/",
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
    playground: false,
//     playground: {tabs: [{
//       endpoint: "http://3.95.189.148:3333/graphql",
//       query: `query GetToken {
//     getToken(email: "coloque seu e-mail", senha: "coloque sua senha") {
//       Authorization
//   }
// }`,
    // headers: {Authorization: ""},
    // name: "Login",
    // variables: "$email, $senha"
    // }]},
    csrfPrevention: false,
    introspection: true,
    
  }), JwtModule, UsersModule, AuthModule, AuthModule, PlantsModule, RecordsModule, PrismaModule, SpeciesModule
],
  controllers: [],
  providers: [ValidationsService, PrismaService, ExecuteOneTimeResolver],
})
export class AppModule implements OnApplicationBootstrap {
  private readonly logger = new Logger('SMS-API');

  onApplicationBootstrap() {
    console.clear();
    this.logger.debug('SMS-API iniciada com sucesso em http://localhost:3333 💡🚷🚀');
  }
}
