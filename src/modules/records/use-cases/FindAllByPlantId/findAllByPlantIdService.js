import { Registro, Planta } from "../../../../database/prisma/schema.js";
import { ErroApp } from "../../../../middlewares/erros.js";

export const isObjectId = (string) => {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  return objectIdRegex.test(string);
};

export const findAllByPlantIdService = async (
  idPlanta,
  intervaloDeDias,
  intervaloDeBusca
) => {
  if (!isObjectId(idPlanta)) {
    throw new ErroApp(400, "ID da planta é inválido");
  }

  const plantaExiste = await Planta.findById(idPlanta);


  if (!plantaExiste) {
    throw new ErroApp(404, "A planta não existe no banco de dados");
  }

  let registros;

  if (!intervaloDeDias && !intervaloDeBusca) {
    registros = await Registro.find({ idPlanta }).sort({ dataDeRegistro: 'asc' });

    return registros;
  }

  if (!intervaloDeDias && intervaloDeBusca) {
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getTime() - intervaloDeBusca * 24 * 60 * 60 * 1000
    );
    registros = await Registro.find({
      idPlanta,
      dataDeRegistro: {
        $gte: startDate,
        $lte: currentDate,
      },
    }).sort({ dataDeRegistro: 'asc' });
    
    return registros;
  }

  if (intervaloDeDias && !intervaloDeBusca) {
    registros = await Registro.find({ idPlanta });
  }

  if (intervaloDeDias && intervaloDeBusca) {
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getTime() - intervaloDeBusca * 24 * 60 * 60 * 1000
    );
    registros = await Registro.find({
      idPlanta,
      dataDeRegistro: {
        $gte: startDate,
        $lte: currentDate,
      },
    });
    
  }

  const aggregatedRecords = [];

  if (registros.length > 0) {
    aggregatedRecords.push(registros[0]);

    for (let i = 1; i < registros.length; i++) {
      const registroDate = new Date(registros[i].dataDeRegistro);
      const lastAggregatedDate = new Date(
        aggregatedRecords[aggregatedRecords.length - 1].dataDeRegistro
      );
      const daysDifference = Math.floor(
        (lastAggregatedDate - registroDate) / (24 * 60 * 60 * 1000)
      );

      if (daysDifference >= intervaloDeDias) {
        aggregatedRecords.push(registros[i]);
      }
    }
  }

  return aggregatedRecords.reverse();
};
