//npm i prisma --save-dev
//$ npx prisma init
//Criar o PrismaClient
//Modificar o schema.prisma e o .env com conexão ao MongoDb
//Lembrar de selecionar a opção conectar com uma aplicação
//Após a URL colar o nome da database depois do "?"
//Lembrar de criar o projeto no Atlas com database, adicionar coleções e modelos
//Depois de ter os modelos criados nas collections usar o próximo comando
//Caso não funcionar, não confiar nos modelos acima e buscar pelo link direto no mongodbCompass (software desktop) no canto superior esquerdo
//$ npx prisma db pull
//$ npx prisma db pull --force  (usado para sob escrever)
//$ npx prisma generate (rodar depois de completar tudo para o vscode nos ajudar)



import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default prisma;