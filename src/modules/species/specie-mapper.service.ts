import { Injectable } from "@nestjs/common";
import { CreateSpecieArgs } from "./use-cases/create-specie/create-specie.args";
import { UpdateSpecieArgs } from "./use-cases/update-specie/update-specie.args";

interface Specie {
  id?: string;
  nome: string;
  descricao: string;
  minNitrogenio: string;
  minFosforo: string;
  minPotassio: string;
  minLuz: string;
  minUmidade: string;
  minTemperatura: string;
  minPh: string;
  maxNitrogenio: string;
  maxFosforo: string;
  maxPotassio: string;
  maxLuz: string;
  maxUmidade: string;
  maxTemperatura: string;
  maxPh: string;
}

interface Parametro {
  min: string;
  max: string;
}

interface Parametros {
  nitrogenio: Parametro;
  fosforo: Parametro;
  potassio: Parametro;
  luz: Parametro;
  umidade: Parametro;
  temperatura: Parametro;
  pH: Parametro;
}

@Injectable()
export class SpecieMapper{
  public mapParametros(parametros: CreateSpecieArgs['parametros'] | UpdateSpecieArgs['parametros']) {

    const { nitrogenio, fosforo, potassio, luz, umidade, temperatura, pH } = parametros;

    return {
      minNitrogenio: nitrogenio.min,
      minFosforo: fosforo.min,
      minPotassio: potassio.min,
      minLuz: luz.min,
      minUmidade: umidade.min,
      minTemperatura: temperatura.min,
      minPh: pH.min,
      maxNitrogenio: nitrogenio.max,
      maxFosforo: fosforo.max,
      maxPotassio: potassio.max,
      maxLuz: luz.max,
      maxUmidade: umidade.max,
      maxTemperatura: temperatura.max,
      maxPh: pH.max
    };
  }

  public reverseMapParametros(specie: Specie): { id: string, nome: string; descricao: string; parametros: Parametros } {
    const parametros: Parametros = {
      nitrogenio: { min: specie.minNitrogenio, max: specie.maxNitrogenio },
      fosforo: { min: specie.minFosforo, max: specie.maxFosforo },
      potassio: { min: specie.minPotassio, max: specie.maxPotassio },
      luz: { min: specie.minLuz, max: specie.maxLuz },
      umidade: { min: specie.minUmidade, max: specie.maxUmidade },
      temperatura: { min: specie.minTemperatura, max: specie.maxTemperatura },
      pH: { min: specie.minPh, max: specie.maxPh }
    };
  
    return { id: specie.id, nome: specie.nome, descricao: specie.descricao, parametros };
  }
  
}