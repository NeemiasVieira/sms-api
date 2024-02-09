
import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as dotevn from 'dotenv';
import prisma from 'src/database/prisma/prisma-client.ts';
import { GraphQLError } from 'graphql';
import { GqlExecutionContext } from '@nestjs/graphql';

dotevn.config();

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger('AuthGuard');

  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);
  
    if (!request) {
      this.logger.error('Requisição inválida: nenhum objeto de requisição encontrado');
      throw new GraphQLError('Requisição inválida');
    }
  
    try {
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        this.logger.error('O token de acesso é obrigatório');
        throw new GraphQLError('O token de acesso é obrigatório');
      }
  
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
        algorithms: ['HS256'],
      });
  
      // AJUSTA PRA NÃO CHEGAR AQUI SE NÃO TIVER TOKEN VÁLIDO
      const id_usuario = decoded.sub;
      await prisma.$connect();
      const usuario = await prisma.users.findUnique({ where: { id: id_usuario } });
  
      if (!usuario) {
        this.logger.error('Usuário não encontrado');
        throw new GraphQLError('Usuário não encontrado');
      }
  
      request['token'] = {
        decoded,
        usuario
      };
    } catch (erro) {
      this.logger.error(`Erro durante a autenticação: ${erro.message}`);
      throw erro;
    } finally {
      await prisma.$disconnect();
    }
  
    return true;
  }
  
  private getRequest(context: ExecutionContext): Request | undefined {
    const httpContext = context.switchToHttp();
    const gqlContext = GqlExecutionContext.create(context);
    return httpContext.getRequest<Request>() || gqlContext.getContext().req;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers?.authorization;

    if (!authHeader) {
      return undefined;
    }

    const [type, token] = authHeader.split(' ') || [];
    return type === 'Bearer' ? token : undefined;
  }
}
