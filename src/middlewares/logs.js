import prisma from "../database/prisma/prismaClient.js";

function isJSON(value) {
  try {
    JSON.parse(value);
    return true; 
  } catch (error) {
    return false; 
  }
}

export const logs = async (request, response, next) => {
  const startTime = Date.now();

  const currentTime = new Date();
  const formattedTime = `${currentTime.getDate()}/${currentTime.getMonth() + 1}/${currentTime.getFullYear()} - ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;

  let responseTime;

  const req = `Requisição ${request.method} em ${request.originalUrl}`;

  // Verifica se a URL da requisição é "/logs" e não cria o log nesse caso
  if (request.originalUrl === "/logs") {
    next();
    return;
  }

  const originalSend = response.send;
  response.send = async function (data) {
    const endTime = Date.now();
    responseTime = endTime - startTime;

    const res = `Resposta ${response.statusCode} em ${responseTime}ms`;
    const time = formattedTime;

    originalSend.call(this, data);

    let logData;

    // Verifica se logData é um objeto antes de analisá-lo como JSON
    if (isJSON(data)) {
      logData = JSON.parse(data);
    } else {
      logData = { conteudo: "Sem conteúdo" };
    }

    await prisma.logs.create({
      data: {
        request: req,
        response: res,
        data: logData,
        time,
      },
    });
  };

  next();
};
