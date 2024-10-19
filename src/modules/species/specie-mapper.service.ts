import { Injectable } from '@nestjs/common';
import { CreateSpecieArgs } from './use-cases/create-specie/create-specie.args';
import { UpdateSpecieArgs } from './use-cases/update-specie/update-specie.args';

interface Specie {
  id: string;
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
  simulado: boolean;
  criadoPor: string;
  dataDeExclusao: Date;
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
export class SpecieMapper {
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
      maxPh: pH.max,
    };
  }

  public reverseMapParametros(
    specie: Specie
  ): { id: string; nome: string; descricao: string; parametros: Parametros } | null {
    if (!specie) return null;

    const {
      minNitrogenio,
      maxNitrogenio,
      minFosforo,
      maxFosforo,
      minPotassio,
      maxPotassio,
      minLuz,
      maxLuz,
      minPh,
      maxPh,
      minTemperatura,
      maxTemperatura,
      minUmidade,
      maxUmidade,
      ...rest
    } = specie;

    const parametros: Parametros = {
      nitrogenio: { min: minNitrogenio, max: maxNitrogenio },
      fosforo: { min: minFosforo, max: maxFosforo },
      potassio: { min: minPotassio, max: maxPotassio },
      luz: { min: minLuz, max: maxLuz },
      umidade: { min: minUmidade, max: maxUmidade },
      temperatura: { min: minTemperatura, max: maxTemperatura },
      pH: { min: minPh, max: maxPh },
    };

    return { parametros, ...rest };
  }
}
