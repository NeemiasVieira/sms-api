import { Router } from "express";
import { errosAssincronos } from "../middlewares/erros.js"
import { createPlantController } from "../modules/plants/use-cases/createPlant/createPlantController.js"
import { getSaudeByIdController } from "../modules/plants/use-cases/getSaudeById/getSaudeByIdController.js"
import { getPlantasByDonoController } from "../modules/plants/use-cases/getPlantasByDonoID/getPlantasByDonoController.js"
export const plantsRoutes = Router();


plantsRoutes.post("/", errosAssincronos(async(resquest, response) => {
    await createPlantController(resquest, response);
  }));
  
  plantsRoutes.get("/saude/:id", errosAssincronos(async (request, response) => {
    return await getSaudeByIdController(request, response);
  }))
  
  plantsRoutes.get("/buscar/:id", errosAssincronos(async (request, response) => {
    return await getPlantasByDonoController(request, response);
  }));