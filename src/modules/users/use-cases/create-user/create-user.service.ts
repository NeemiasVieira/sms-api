import { Injectable } from "@nestjs/common";
import { hash } from "bcrypt";
import { User } from "../../user.type";
import { GraphQLError } from 'graphql';
import { PrismaService } from "src/database/prisma/prisma.service";

@Injectable()
export class CreateUserService{
    constructor(private readonly prismaService: PrismaService){}

    async createUser(nome: string, email: string, senha: string): Promise<User>{

        await this.prismaService.$connect();

        if(!nome || !email || !senha){
            throw new GraphQLError("Todos os campos são obrigatórios!");
        }
    
        const usuarioExiste = await this.prismaService.users.findUnique({where: {email}});     
    
        if(usuarioExiste){
            throw new GraphQLError("Usuário já existe");
        }
    
        if(!this.emailValido(email)){
            throw new GraphQLError("E-mail invalido");
        }
    
        if(!this.senhaSegura(senha)){
            throw new GraphQLError("A senha precisa conter pelo menos um caractere especial, uma letra maiuscula, 8 caracteres e um número, tente novamente.");
        }
    
        let senhaCriptografada = await this.criptografar(senha);
    
        const dataDeCriacao = new Date();
    
        const newUser = await this.prismaService.users.create({data:{nome, email, senha: senhaCriptografada, dataDeCriacao, profile: "user"}});
    
        await this.prismaService.$disconnect();
    
        return newUser;

    }

    private senhaSegura(senha: string){
        if (senha.length < 8) return false;
        if (!/[A-Z]/.test(senha)) return false;
        if (!/[\W_]/.test(senha)) return false;
        if (!/\d/.test(senha)) return false;
        return true; 
    };

    private emailValido(email: string){
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
        return emailRegex.test(email);
    }

    private async criptografar(senha: string): Promise<string>{
        return await hash(senha, Number(process.env.PASSWORD_SALT));
    }
}