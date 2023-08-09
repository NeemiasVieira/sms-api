import { Router } from "express";
import prisma from "../database/prisma/prismaClient.js";

const routes = Router();

routes.get("/", async(request, response) => {
  let email = "exemplo@gmail.com";
  let senha = "123456"
  let dataDeCriacao = new Date();
  await prisma.$connect();
  await prisma.users.create({data:{
    email,
    senha,
    dataDeCriacao
  }})
  
  await prisma.$disconnect();
  response.send("Usuário criado com sucesso");
})

export default routes;