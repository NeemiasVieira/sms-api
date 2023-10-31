import express from "express";
import routes from "./routes.js";
import cors from "cors";
import { logs } from "../middlewares/logs.js";
import { ErrosComuns } from "../middlewares/erros.js";
import cron from "node-cron";
import prisma from "../database/prisma/prismaClient.js";


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

app.use(logs);
app.use(routes);


//app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec, SwaggerOptions));
app.use(ErrosComuns);

app.listen(process.env.PORT || 3333, "0.0.0.0", () => {
  console.log("▶️  Servidor iniciado com sucesso em http://localhost:3333 🆙");
});
