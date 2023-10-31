export const swaggerSpec = {
  "openapi": "3.0.1",
  "info": {
    "title": "SMS API - Documentação",
    "description": "O projeto Sistema de Monitoramento do Solo tem foco no desenvolvimento e cuidados com o crescimento de plantas.<br><br>Nosso objetivo é trazer praticidade para o plantio domiciliar, através da implementação tecnólogica que auxiliará em todos os cuidados da sua plantinha.<br><br>O sistema contará com controle em tempo real de onde estiver, monitorando a planta por imagens, que conseguirão detectar a presença de doenças e/ou anomalias, e também contará com o controle de nutrientes e estatísticas como: Nitrogênio, Fósforo, Potássio (NPK), umidade, temperatura e pH.",
    "version": "1.0.2"
  },
  "basePath": "/",
  "tags": [
    {
      "name": "Usuários",
      "description": "Operações relacionadas a usuários"
    },
    {
      "name": "Plantas",
      "description": "Operações relacionadas as plantas"
    },
    {
      "name": "Registros",
      "description": "Operações relacionadas aos registros"
    },
    {
      "name": "Logs",
      "description": "Operações relacionadas aos logs"
    }
  ],
  "paths": {
    "/usuarios": {
      "post": {
        "summary": "Cadastro de usuário",
        "requestBody": {
          "content": {
            "application/json": {
              "example": {
                "nome": "Fulano da Silva",
                "email": "fulano@outlook.com",
                "senha": "$2b$08$d/SyueNT/ptWVq26x4XMLOR.NqpVDKxAwB9nD6RK5CTAjFUIIiQfq"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Usuário criado com sucesso",
            "content": {
              "application/json": {
                "example": {
                  "id": "654105d656c8f227b012d184",
                  "email": "fulano@outlook.com",
                  "nome": "Fulano da Silva",
                  "senha": "$2b$08$d/SyueNT/ptWVq26x4XMLOR.NqpVDKxAwB9nD6RK5CTAjFUIIiQfq",
                  "dataDeCriacao": "2023-10-31T13:49:10.029Z"
                }
              }
            }
          }
        },
        "tags": ["Usuários"]
      }
    },
    "/usuarios/login": {
      "post": {
        "summary": "Autenticação de usuário",
        "requestBody": {
          "content": {
            "application/json": {
              "example": {
                "email": "joao@outlook.com",
                "senha": "PrecisaSerUmaSenhaForte123@_"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Usuário autenticado",
            "content": {
              "application/json": {
                "example": {
                  "resposta": "Usuário João logado com sucesso!",
                  "usuario": {
                    "id": "6529434d37fa0731e81f454c",
                    "email": "joao@outlook.com",
                    "nome": "João Augusto",
                    "senha": "$2b$08$/ucRuBtWR30xk1JObO6mveRcQogsdOxPBELLJI6S/xmTZEqM3ux2q",
                    "dataDeCriacao": "2023-10-13T13:17:01.219Z"
                  },
                  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTg3NjA0MDgsImV4cCI6MTY5ODg0NjgwOCwic3ViIjoiNjUyOTQzNGDzfa0731e81f454c"
                }
              }
            }
          },
          "401": {
            "description": "Falha na autenticação",
            "content": {
              "application/json": {
                "example": {
                  "mensagem": "Usuário ou senha incorretos! Tente novamente."
                }
              }
            }
          }
        },
        "tags": ["Usuários"]
      }
    },
    "/plantas": {
      "post": {
        "summary": "Criação de planta",
        "requestBody": {
          "content": {
            "application/json": {
              "example": {
                "idDono": "6529434d37fa0731e81f454c",
                "nome": "A melhor",
                "especie": "Manjericão"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Planta criada com sucesso",
            "content": {
              "application/json": {
                "example": {
                  "id": "652955aa670b516ea2a104d0",
                  "idDono": "6529434d37fa0731e81f454c",
                  "nome": "Planta Legal",
                  "especie": "Manjericão",
                  "dataDaPlantacao": "2023-10-13T11:35:22.898Z"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
                "example": {
                  "mensagem": [
                    "O campo espécie da planta é obrigatório!",
                    "O campo idDono é obrigatório!, O ID do dono da planta é invalido, Usuário (Dono) não existe"
                  ]
                }
              }
            }
          }
        },
        "tags": ["Plantas"]
      }
    },
    "/plantas/{idPlanta}": {
      "delete": {
        "summary": "Exclusão de planta",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Exclusão da planta com sucesso",
            "content": {
              "application/json": {
                "example": null
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
                "example": {
                  "mensagem": "O ID é inválido!"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "application/json": {
                "example": {
                  "mensagem": "Nenhuma planta encontrada"
                }
              }
            }
          }
        },
        "tags": ["Plantas"]
      }
    },
    "/plantas/buscar/{idDono}": {
      "get": {
        "summary": "Buscar plantas pelo ID do Dono",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Plantas encontradas com sucesso",
            "content": {
              "application/json": {
                "example": [
                  {
                    "id": "652955aa670b516ea2a104d0",
                    "idDono": "6529434d37fa0731e81f454c",
                    "nome": "Planta Legal",
                    "especie": "Manjericão",
                    "dataDaPlantacao": "2023-10-13T11:35:22.898Z"
                  },
                  {
                    "id": "652ad43ba9cb5d7015350c8b",
                    "idDono": "6529434d37fa0731e81f454c",
                    "nome": "The Test Plant",
                    "especie": "Suculenta",
                    "dataDaPlantacao": "2023-10-14T14:47:39.714Z"
                  }
                ]
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
                "example": {
                  "mensagem": "O ID é inválido!"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "application/json": {
                "example": {
                  "mensagem": "Não existe nenhum usuário com esse ID"
                }
              }
            }
          }
        },
        "tags": ["Plantas"]
      }
    },
    "/plantas/saude/{idPlanta}": {
      "get": {
        "summary": "Gerar Relatório de Saúde baseado no último registro da planta",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Relatório de Saúde Gerado com Sucesso",
            "content": {
              "application/json": {
                "example": {
                  "nitrogenio": "Deficiência",
                  "fosforo": "Deficiência",
                  "potassio": "Deficiência",
                  "umidade": "Deficiência",
                  "temperatura": "Saudável",
                  "pH": "Excesso",
                  "estadoGeral": "Ruim",
                  "ultimaAtualizacao": "2023-10-25T21:14:07.205Z",
                  "alertas": [
                    "Deficiência de nitrogênio pode afetar negativamente a planta. A faixa saudável para o Manjericão é entre 50 a 200mg/Kg.",
                    "Deficiência de fósforo pode prejudicar o desenvolvimento da planta. A faixa saudável para o Manjericão é entre 30 a 75mg/Kg.",
                    "Deficiência de potássio pode impactar a saúde da planta. A faixa saudável para o Manjericão é entre 200 a 300mg/Kg.",
                    "Umidade do ar abaixo de 50% pode levar à desidratação da planta. Monitore a umidade do solo.",
                    "pH do solo acima de 7.0 pode resultar em deficiência de nutrientes e desequilíbrios no solo. Faça correções no solo."
                  ]
                }
              }
            }
          },
          "204": {
            "description": "No Content",
            "content": {
              "application/json": {
                "example": {
                  "mensagem": "A planta não possui nenhum registro"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "application/json": {
                "example": {
                  "mensagem": "A planta não existe"
                }
              }
            }
          }
        },
        "tags": ["Plantas"]
      }
    },
    "/plantas/registro/{idPlanta}": {
      "get": {
        "summary": "Recupera o último registro pelo ID da planta",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Último registro consultado com sucesso",
            "content": {
              "application/json": {
                "example": {
                  "id": "6539851fd3348a9efb780838",
                  "idPlanta": "652955aa670b516ea2a104d0",
                  "nitrogenio": "0.32",
                  "fosforo": "0.88",
                  "potassio": "1.04",
                  "umidade": "9.4",
                  "temperatura": "23.8",
                  "pH": "9.0",
                  "dataDeRegistro": "2023-10-25T21:14:07.205Z"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "application/json": {
                "example": {
                  "mensagem": "Planta não encontrada"
                }
              }
            }
          }
        },
        "tags": ["Plantas"]
      }
    },
    "/plantas/{idPlant}": {
      "patch": {
        "summary": "Atualiza planta pelo ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "example": {
                "nome": "Planta Legal",
                "especie": "Manjericão"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Atualização realizada com sucesso",
            "content": {
              "application/json": {
                "example": {
                  "id": "652955aa670b516ea2a104d0",
                  "idDono": "6529434d37fa0731e81f454c",
                  "nome": "Planta Legal",
                  "especie": "Manjericão",
                  "dataDaPlantacao": "2023-10-13T11:35:22.898Z"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
                "example": {
                  "mensagem": [
                    "O ID é inválido!",
                    "Os campos nome e espécie são obrigatórios."
                  ]
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "application/json": {
                "example": {
                  "mensagem": "Nenhuma planta encontrada"
                }
              }
            }
          }
        },
        "tags": ["Plantas"]
      }
    },
    "/registros": {
      "post": {
        "summary": "Registro do sensor",
        "requestBody": {
          "content": {
            "application/json": {
              "example": {
                "idPlanta": "652ad43ba9cb5d701532054c",
                "nitrogenio": "100",
                "fosforo": "50.5",
                "potassio": "241.5",
                "umidade": "63.7",
                "temperatura": "25.4",
                "pH": "6.7"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Registro criado com sucesso",
            "content": {
              "application/json": {
                "example": {
                  "id": "654130d97135d66a3f1b53c0",
                  "idPlanta": "652ad43ba9cb5d7015350c8b",
                  "nitrogenio": "100",
                  "fosforo": "50.5",
                  "potassio": "241.5",
                  "umidade": "63.7",
                  "temperatura": "25.4",
                  "pH": "6.7",
                  "dataDeRegistro": "2023-10-31T16:52:41.579Z"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
                "example": {
                  "mensagem": "Todos os campos são obrigatórios, são eles: idPlanta, nitrogenio, fosforo, potassio, umidade, temperatura, pH"
                }
              }
            }
          }
        },
        "tags": ["Registros"]
      }
    },
    "/registros/{idRegistro}": {
      "delete": {
        "summary": "Exclusão de registro",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Exclusão realizada com sucesso",
            "content": {
              "application/json": {
                "example": {}
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
                "example": {
                  "mensagem": "ID inválido"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "application/json": {
                "example": {
                  "mensagem": "Registro não existe"
                }
              }
            }
          }
        },
        "tags": ["Registros"]
      }
    },
    "/registros/{idPlanta}": {
      "get": {
        "summary": "Consulta de registros",
        "parameters": [
          {
            "name": "idPlanta",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "intervaloDeDias",
            "in": "query",
            "description": "Número de dias entre um registro e outro, por exemplo, ao inserir o número 5, a cada 5 dias irá retornar apenas um registro independentemente do número de registros nesse intervalo.",
            "required": false,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "intervaloDeBusca",
            "in": "query",
            "description": "Número de dias para busca, exemplo: para buscar nas últimas duas semanas: 14.",
            "required": false,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Consulta de registros realizada com sucesso",
            "content": {
              "application/json": {
                "example": [
                  {
                    "id": "653bb0099b0fcdd8cbe85d67",
                    "idPlanta": "652ad43ba9cb5d7015350c8b",
                    "nitrogenio": "100",
                    "fosforo": "75",
                    "potassio": "220",
                    "umidade": "60",
                    "temperatura": "15",
                    "pH": "7",
                    "dataDeRegistro": "2023-10-27T12:41:45.808Z"
                  },
                  {
                    "id": "653bb0343874a4bb39349987",
                    "idPlanta": "652ad43ba9cb5d7015350c8b",
                    "nitrogenio": "180",
                    "fosforo": "150",
                    "potassio": "50",
                    "umidade": "60",
                    "temperatura": "15",
                    "pH": "7",
                    "dataDeRegistro": "2023-10-27T12:42:27.936Z"
                  }
                ]
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
                "example": {
                  "mensagem": "ID da planta é inválido"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "application/json": {
                "example": {
                  "mensagem": "A planta não existe no banco de dados"
                }
              }
            }
          }
        },
        "tags": ["Registros"]
      }
    },
    "/registros/{IDRegistro}": {
      "patch": {
        "summary": "Atualização de registro",
        "parameters": [
          {
            "name": "idRegistro",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "example": {
                "idPlanta": "652ad43ba9cb5d7015350c8b",
                "nitrogenio": "100",
                "fosforo": "75",
                "potassio": "220",
                "umidade": "60",
                "temperatura": "15",
                "pH": "7",
                "dataDeRegistro": "2023-10-27T12:41:45.808Z"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Registro atualizado com sucesso",
            "content": {
              "application/json": {
                "example": {
                  "id": "653bb0099b0fcdd8cbe85d67",
                  "idPlanta": "652ad43ba9cb5d7015350c8b",
                  "nitrogenio": "100",
                  "fosforo": "75",
                  "potassio": "220",
                  "umidade": "60",
                  "temperatura": "15",
                  "pH": "7",
                  "dataDeRegistro": "2023-10-27T12:41:45.808Z"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
                "example": {
                  "mensagem": "ID inválido!"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "content": {
              "application/json": {
                "example": {
                  "mensagem": "Registro não encontrado"
                }
              }
            }
          }
        },
        "tags": ["Registros"]
      }
    },
    "/logs": {
      "get": {
        "summary": "Consulta dos logs",
        "responses": {
          "200": {
            "description": "Consulta realizada com sucesso",
            "content": {
              "application/json": {
                "example": [
                  {
                    "id": "6541398c00867511294adab3",
                    "request": "Requisição POST em /usuarios/login",
                    "response": "Resposta 401 em 68ms",
                    "time": "31/10/2023 - 17:29:48",
                    "data": {
                      "mensagem": "Usuário ou senha incorretos! Tente novamente."
                    }
                  }
                ]
              }
            }
          }
        },
        "tags": ["Logs"]
      },
      "delete": {
        "summary": "Exclusão de todos os logs",
        "responses": {
          "204": {
            "description": "Exclusão realizada com sucesso"
          }
        },
        "tags": ["Logs"]
      }
    }
  }
}