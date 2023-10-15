import { Router } from "express";
import { errosAssincronos } from "../middlewares/erros.js";
import { createPlantController } from "../modules/plants/use-cases/createPlant/createPlantController.js";
import { getSaudeByIdController } from "../modules/plants/use-cases/getSaudeById/getSaudeByIdController.js";
import { getPlantasByDonoController } from "../modules/plants/use-cases/getPlantasByDonoID/getPlantasByDonoController.js";
import { getUltimoRegistroController } from "../modules/plants/use-cases/getUltimoRegistro/getUltimoRegistroController.js";
import { deletePlantByIDController } from "../modules/plants/use-cases/deletePlantByID/deletePlantByIDController.js";
import { updatePlantByIDController } from "../modules/plants/use-cases/updatePlantByID/updatePlantByIDController.js";
export const plantsRoutes = Router();

plantsRoutes.post(
  "/",
  errosAssincronos(async (resquest, response) => {
    await createPlantController(resquest, response);
  })
);

plantsRoutes.get(
  "/saude/:id",
  errosAssincronos(async (request, response) => {
    return await getSaudeByIdController(request, response);
  })
);

plantsRoutes.get(
  "/buscar/:id",
  errosAssincronos(async (request, response) => {
    return await getPlantasByDonoController(request, response);
  })
);

plantsRoutes.get(
  "/registro/:id",
  errosAssincronos(async (request, response) => {
    return await getUltimoRegistroController(request, response);
  })
);

plantsRoutes.delete(
  "/:id",
  errosAssincronos(async (request, response) => {
    return await deletePlantByIDController(request, response);
  })
);

plantsRoutes.patch("/:id", errosAssincronos(async(request, response) => {
  return await updatePlantByIDController(request, response);
}));
