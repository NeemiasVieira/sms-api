
import { swaggerSpec } from "./swagger.js";
import express, { Router } from "express";
import routes from "./routes.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { logs } from "../middlewares/logs.js";
import { ErrosComuns } from "../middlewares/erros.js";
import cron from "node-cron";
import prisma from "../database/prisma/prismaClient.js";
import connectToMongo from '../database/prisma/prismaClient.js';
import * as dotevn from 'dotenv';

dotevn.config();

const router = Router();

const SwaggerOptions = {
  customSiteTitle: "SMS-API",
  // customfavIcon: "../assets/img/favicon",

  //Temas do Swagger: https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/
  customCssUrl:
    "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-outline.css",
  customCss: ".swagger-ui .topbar { background-color: rgb(16, 187, 64) } !important"
};

// https://sms-api-git-main-neemiasvieira.vercel.app/

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT", "OPTIONS"],
    allowedHeaders: "*",
    credentials: true,
    optionsSuccessStatus: 200,
    exposedHeaders: "*",
  })
);

cron.schedule(
  "0 0 * * *",
  async () => {
    console.log(
      "Exclusão dos logs pela varredura da meia noite concluido com sucesso 😎"
    );
    await prisma.logs.deleteMany();
  },
  {
    timezone: "America/Sao_Paulo",
  }
);

//app.use(logs);
app.use(routes);


app.use("/api", swaggerUi.serve, express.static("node_modules/swagger-ui-dist/", {index: false}),swaggerUi.serveFiles(swaggerSpec, SwaggerOptions), swaggerUi.setup(swaggerSpec, SwaggerOptions));
app.use(ErrosComuns);

app.listen(process.env.PORT || 3333, "0.0.0.0", async () => {
  connectToMongo()
  console.log("▶️  Servidor iniciado com sucesso em http://localhost:3333 🆙");
});
