import jwt from 'jsonwebtoken';
import { ErroApp } from './erros.js';
import { User } from '../database/prisma/schema.js';

export const jwtToken = async (request, response) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new ErroApp(401, "Token Inválido");

  // Divida o header do token em duas partes: "Bearer" e o token real
  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    throw new ErroApp(401, "Token Inválido");
  }

  try {
    const verification = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    const id = verification.sub;

    const user = await User.findOne({ _id: id });

    if (!user) throw new ErroApp(400, "Usuário não existe");

    request.user = {
      id: user.id,
    };

    return user.id;
  } catch (error) {
    throw new ErroApp(400, "Token inválido" + error);
  }
};
