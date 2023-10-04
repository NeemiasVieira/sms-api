//Clase que irá tratar os erros sem derrubar o servidor
export class ErroApp {
    codigo;
    mensagem;
  
    constructor(codigo, mensagem) {
      this.codigo = codigo;
      this.mensagem = mensagem;
    }
  }
  
  //Resolve erros assincronos não tratados pelo Express
  export const errosAssincronos = (manipular) => {
    return (requisicao, resposta, proximo) => {
      return Promise.resolve(manipular(requisicao, resposta, proximo)).catch(
        (e) => proximo(e)
      );
    };
  };
  
  //Trata os erros esperados e inesperados
  export const ErrosComuns = (erro, requisicao, resposta, next) => {
    if (erro instanceof ErroApp) {
      return resposta.status(erro.codigo).json({ mensagem: erro.mensagem });
    }
  
    return resposta.status(500).json({
      status: "Erro",
      mensagem: "Erro interno do servidor =(",
    });
  };