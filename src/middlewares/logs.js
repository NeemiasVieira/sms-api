import prisma from "../database/prisma/prismaClient.js";

export const logs = async(request, response, next) => {
    const currentTime = new Date();
    const formattedTime = `${currentTime.getDate()}/${currentTime.getMonth() + 1}/${currentTime.getFullYear()} - ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
    
    // Defina a variável responseTime no escopo principal do middleware
    let responseTime;
  
    const req = `Requisição ${request.method} em ${request.originalUrl}`;
  
    // Captura a resposta original.send para acessar a mensagem de sucesso
    const originalSend = response.send;
    response.send = async function (data) {
      // Registra a mensagem de sucesso e responseTime
      responseTime = new Date() - currentTime; // Atualize responseTime aqui
      const res = `Resposta ${response.statusCode} em ${responseTime}ms`;
      const time = formattedTime;
      const dat = JSON.parse(data)
      originalSend.call(this, data);

      await prisma.logs.create({data: {
        request: req,
        response: res,
        data: dat,
        time
      }});
    };
  
    next();
  };
  