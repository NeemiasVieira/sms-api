import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//Carrega as variáveis de ambiente
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prisma = new PrismaClient();
  console.log(await prisma.$connect())
  console.log(await prisma.users.findFirst());
  app.enableCors();
  await app.listen(3333);

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false, //Permite a costumização de mensagens do class-validator
      whitelist: true, //Não permite que campos não esperados sejam enviados para o servidor
      forbidNonWhitelisted: true,
    }),
  );
}
bootstrap();
