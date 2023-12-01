import { ErroApp } from "../../../../middlewares/erros.js";
import { Registro } from "../../../../database/prisma/schema.js";

export const createRecordService = async (idPlanta, nitrogenio, fosforo, potassio, umidade, temperatura, pH) => {
  if (!idPlanta || !nitrogenio || !fosforo || !potassio || !umidade || !temperatura || !pH) {
    throw new ErroApp(400, "Todos os campos são obrigatórios, são eles: idPlanta, nitrogenio, fosforo, potassio, umidade, temperatura, ph");
  }



  const dataDeRegistro = new Date();

  const novoRegistro = await Registro.create({
    idPlanta,
    nitrogenio,
    fosforo,
    potassio,
    umidade,
    temperatura,
    pH,
    dataDeRegistro,
  });

  return novoRegistro;
};
