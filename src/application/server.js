import express from "express";
import routes from "./routes.js";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333,"0.0.0.0", () => {
  console.log("▶️  Servidor iniciado com sucesso em http://localhost:3333 🆙");
})