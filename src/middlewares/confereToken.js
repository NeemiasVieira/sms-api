import pkg from 'jsonwebtoken';
const { verify } = pkg;
import { ErroApp } from './erros.js';
import prisma from '../database/prisma/prismaClient.js';

export const jwtToken = async(request, response) => {
    const authHeader = request.headers.authorization;

  if (!authHeader) throw new ErroApp(401, "Token Inválido");

  // Divida o header do token em duas partes: "Bearer" e o token real
  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    throw new ErroApp(401, "Token Inválido");
  }

  try{  
    
    const verification = verify(token,process.env.JWT_SECRET, { algorithms: ['HS256'] });
    const id = verification.sub;
  
    const user = await prisma.users.findUnique({where:{id}})


    if(!user) throw new ErroApp(400, "Usuario não existe");

    
    request.user = {
      id: user.id,
    };

    return user.id;

  }
  catch(erro){
    throw new ErroApp(400, "Token invalido" + erro);
  }
}