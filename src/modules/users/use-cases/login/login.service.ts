import { Injectable, Logger } from '@nestjs/common';
import { compare } from 'bcrypt';
import { GraphQLError } from 'graphql';
import { JwtService } from '@nestjs/jwt';
import { ILoginUserResponse } from './login.args';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class LoginService {
  private readonly logger = new Logger('LoginService');

  constructor(
    private jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  public async login(email: string, senha: string): Promise<ILoginUserResponse> {
    await this.prismaService.$connect();

    this.logger.log(`Tentativa de login de ${email}`);

    const usuarioExiste = await this.prismaService.users.findUnique({ where: { email } });

    if (!usuarioExiste) {
      this.logger.error('Usuário ou senha incorretos');
      throw new GraphQLError('Usuário ou senha incorretos');
    }

    const usuarioNoBanco = usuarioExiste;
    const senhaEstaCorreta = await compare(senha, usuarioNoBanco.senha);

    if (!senhaEstaCorreta) {
      this.logger.error('Usuário ou senha incorretos');
      throw new GraphQLError('Usuário ou senha incorretos');
    }

    //No token é armazenado o ID do usuário para usos futuros da aplicação
    const token = this.jwtService.sign({}, { secret: process.env.JWT_SECRET, subject: String(usuarioExiste.id) });

    const nomes = usuarioExiste.nome.split(' ');

    this.logger.verbose(`Usuário ${email} autenticado.`);

    await this.prismaService.$disconnect();

    return {
      resposta: `Usuário ${nomes[0]} autenticado com sucesso!`,
      usuario: usuarioNoBanco,
      token: token,
    };
  }
}
