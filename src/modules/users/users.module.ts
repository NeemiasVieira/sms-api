import { Module } from '@nestjs/common';
import { GetUsersResolver } from './use-cases/get-users/get-users.resolver';
import { CreateUserService } from './use-cases/create-user/create-user.service';
import { CreateUserResolver } from './use-cases/create-user/create-user.resolver';
import { LoginService } from './use-cases/login/login.service';
import { LoginResolver } from './use-cases/login/login.resolver';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7h', algorithm: 'HS256' },
    }),
  ],
  providers: [
    GetUsersResolver,
    CreateUserResolver,
    CreateUserService,
    LoginResolver,
    LoginService,
  ],
})
export class UsersModule {}
