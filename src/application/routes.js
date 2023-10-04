import { Router } from "express";
import { createUserController } from "../modules/users/useCases/createUser/createUserController.js";
import { errosAssincronos } from "../middlewares/erros.js";
import loginController from "../modules/users/useCases/loginUser/loginController.js";
import { createPlantController } from "../modules/plants/use-cases/createPlant/createPlantController.js";
import { createRecordController } from "../modules/records/use-cases/CreateRecord/CreateRecordController.js";
import { findAllByPlantIdController } from "../modules/records/use-cases/FindAllByPlantId/findAllByPlantIdController.js";


const routes = Router();

routes.post("/usuarios", errosAssincronos(async(request, response) => {
  await createUserController(request, response);
}));

routes.post("/login", errosAssincronos(async(request, response) => {
  await loginController(request, response);
}));

routes.post("/plantas", errosAssincronos(async(resquest, response) => {
  await createPlantController(resquest, response);
}));

routes.post("/registros", errosAssincronos(async(request, response) => {
  await createRecordController(request, response);
}));

routes.get("/registros/:idPlanta", errosAssincronos(async(request, response) => {
  await findAllByPlantIdController(request, response);
}));

export default routes;