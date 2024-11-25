export interface valoresPDF {
  usuario: {
    id: string;
    nome: string;
  };
  planta: {
    nome: string;
    id: string;
    dataDePlantacao: string;
  };
  especie: {
    id: string;
    nome: string;
    descricao: string;
    parametros: {
      nitrogenio: {
        min: string;
        max: string;
      };
      fosforo: {
        min: string;
        max: string;
      };
      potassio: {
        min: string;
        max: string;
      };
      luz: {
        min: string;
        max: string;
      };
      umidade: {
        min: string;
        max: string;
      };
      temperatura: {
        min: string;
        max: string;
      };
      pH: {
        min: string;
        max: string;
      };
    };
  };
  registro: {
    id: string;
    idPlanta: string;
    nomeEspecie: string;
    nitrogenio: string;
    fosforo: string;
    potassio: string;
    umidade: string;
    temperatura: string;
    pH: string;
    luz: string;
    lux: string;
    dataDeRegistro: string;
    imagem: string;
    diagnostico: string;
  };
}

interface Parametro {
  min: string;
  max: string;
}

enum HealthClass {
  HEALTHY = 'Saudavel',
  EXCESS = 'Excesso',
  DEFICIENCY = 'Deficiencia',
  Default = 'Default',
}

export const getInfoColor = (value: string, param: Parametro): HealthClass => {
  if (!value || !param) return;

  const numericValue = Number(value);
  const min = Number(param.min);
  const max = Number(param.max);

  if (isNaN(numericValue) || isNaN(min) || isNaN(max)) return HealthClass.Default;

  if (numericValue > max) return HealthClass.EXCESS;
  if (numericValue < min) return HealthClass.DEFICIENCY;
  if (numericValue >= min && numericValue <= max) return HealthClass.HEALTHY;

  return HealthClass.Default;
};

export const formatarExibicao = (numeroStr: string): string => {
  if (!numeroStr) return '';

  const numero = Number(numeroStr);
  if (isNaN(numero)) return '';

  if (numero >= 1000) {
    const numeroK = numero / 1000;
    return `${numeroK % 1 === 0 ? numeroK.toFixed(0) : numeroK.toFixed(1).replace('.', ',')}K`;
  }

  return numero % 1 === 0 ? numero.toFixed(0) : numero.toFixed(1).replace('.', ',');
};
