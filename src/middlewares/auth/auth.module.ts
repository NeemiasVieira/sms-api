import { Module } from '@nestjs/common';
import * as dotevn from 'dotenv';
import { AuthGuard } from './auth';
import { JwtModule } from '@nestjs/jwt';

dotevn.config();

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '7h', algorithm: 'HS256' },
  }),],
  providers: [AuthGuard],
  exports: [],
})
export class AuthModule {}