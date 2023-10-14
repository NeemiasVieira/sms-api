import prisma from "../../../../database/prisma/prismaClient.js";
import { ErroApp } from "../../../../middlewares/erros.js";

export const isObjectId = (string) => {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  return objectIdRegex.test(string);
}

export const findAllByPlantIdService = async (idPlanta, intervaloDeDias, intervaloDeBusca) => { 
  console.log("ID da planta:", idPlanta);
  console.log("Intervalo de dias:", intervaloDeDias);
  console.log("Intervalo de busca:", intervaloDeBusca);

  if (!isObjectId(idPlanta)) {
    throw new ErroApp(400, "ID da planta é inválido");
  }

  await prisma.$connect();

  const plantaExiste = await prisma.plantas.findUnique({ where: { id: idPlanta } });

  if (!plantaExiste) {
    throw new ErroApp(404, "A planta não existe no banco de dados");
  }

  if (!intervaloDeDias || !intervaloDeBusca) {
    const registros = await prisma.registros.findMany({ where: { idPlanta } });
    console.log("Registros sem filtro de data:", registros);
    return registros;
  }

  const currentDate = new Date();
const startDate = new Date(currentDate.getTime() - intervaloDeBusca * 24 * 60 * 60 * 1000);

const registros = await prisma.registros.findMany({
  where: {
    idPlanta,
    dataDeRegistro: {
      gte: startDate,
      lte: currentDate,
    },
  },
});

const aggregatedRecords = [];

if (registros.length > 0) {
  aggregatedRecords.push(registros[0]);

  for (let i = 1; i < registros.length; i++) {
    const registroDate = new Date(registros[i].dataDeRegistro);
    const lastAggregatedDate = new Date(aggregatedRecords[aggregatedRecords.length - 1].dataDeRegistro);
    const daysDifference = Math.floor((lastAggregatedDate - registroDate) / (24 * 60 * 60 * 1000));

    if (daysDifference >= intervaloDeDias) {
      aggregatedRecords.push(registros[i]);
    }
  }
}

await prisma.$disconnect();

return aggregatedRecords;


}
