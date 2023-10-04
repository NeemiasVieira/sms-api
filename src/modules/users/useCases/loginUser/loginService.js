import { ErroApp } from "../../../../middlewares/erros.js";
import { compare } from "bcrypt";
import prisma from "../../../../database/prisma/prismaClient.js";
import pkg from "jsonwebtoken";
const { sign } = pkg;

const loginService = async (email, senha) => {

  email = email.toLowerCase();

  //Conexão com o banco de dados
  await prisma.$connect();

  //Verifica se o usuário existe pelo e-mail
  let usuarioExiste = await prisma.users.findUnique({ where: { email } });

  // Tratamento caso o usuário não exista
  if (!usuarioExiste) {
    throw new ErroApp(401, "Usuário ou senha incorretos! Tente novamente.");
  }

  //Verifica a senha do usuário
  let senhaEmBanco = usuarioExiste.senha;
  let senhaIncorreta = await compare(senha, senhaEmBanco);
  senhaIncorreta = !senhaIncorreta;

  //Tratamento de senha incorreta
  if (senhaIncorreta) {
    throw new ErroApp(401, "Usuário ou senha incorretos! Tente novamente.");
  } 

  //Desconexão com o banco de dados
  await prisma.$disconnect();

  const token = sign({}, process.env.JWT_SECRET, {
    subject: usuarioExiste.id,
    expiresIn: "1d",
  });

  //Caso de sucesso do login
  return {resposta: `Usuário ${usuarioExiste.nome.split(" ")[0]} logado com sucesso!`, usuario: usuarioExiste, token};
};

export default loginService;