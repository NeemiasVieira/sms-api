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
