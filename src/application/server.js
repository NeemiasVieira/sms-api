import express from "express";
import routes from "./routes.js";
import { ErrosComuns } from "../middlewares/erros.js";
import cors from "cors";

// https://sms-api-git-main-neemiasvieira.vercel.app/ 

const app = express();

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', "DELETE", "PATCH", "PUT", "OPTIONS"],
  allowedHeaders: "*",
  credentials: true,
  optionsSuccessStatus: 200,
  exposedHeaders: "*",

}));
app.use(routes);
app.use(ErrosComuns);

app.listen(process.env.PORT || 3333,"0.0.0.0", () => {
  console.log("▶️  Servidor iniciado com sucesso em http://localhost:3333 🆙");
})

