import prisma from "../../../../database/prisma/prismaClient.js"
import { ErroApp } from "../../../../middlewares/erros.js";
import { hash } from "bcrypt";

const senhaSegura = (senha) => {
    //Função responsável por verificar as políticas de segurança de senhas
    // Verifica se a senha tem pelo menos 8 caracteres
    if (senha.length < 8) return false;
    // Verifica se há pelo menos uma letra maiúscula
    if (!/[A-Z]/.test(senha)) return false;
    // Verifica se há pelo menos um caractere especial
    if (!/[\W_]/.test(senha)) return false;
    // Verifica se há pelo menos um número
    if (!/\d/.test(senha)) return false;
  
    return true; //Caso não entre em nenhuma condição de falha de segurança retorna true
  };

  const emailValido = (email) => {
    // Define a expressão regular para verificar o formato do e-mail
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
  
    // Testa o e-mail com a expressão regular e retorna true se for válido, caso contrário, retorna false
    return emailRegex.test(email);
  }

  const criptografar = (senha) => hash(senha, Number(process.env.PASSWORD_SALT));

export const createUserService = async(nome, email, senha) => {     

    await prisma.$connect();

    if(!nome || !email || !senha){
        throw new ErroApp(400, "Todos os campos são obrigatórios!");
    }

    const usuarioExiste = await prisma.users.findUnique({where: {email}});     

    if(usuarioExiste){
        throw new ErroApp(400, "Usuário já existe");
    }

    if(!emailValido(email)){
        throw new ErroApp(400, "E-mail invalido");
    }

    if(!senhaSegura(senha)){
        throw new ErroApp(400, "A senha precisa conter pelo menos um caractere especial, uma letra maiuscula, 8 caracteres e um número, tente novamente.")
    }

    let senhaCriptografada = await criptografar(senha);

    const dataDeCriacao = new Date();

    const newUser = await prisma.users.create({data:{nome, email, senha: senhaCriptografada, dataDeCriacao}})

    await prisma.$disconnect();

    return newUser;

}