import { Router } from "express";
import { createUserController } from "../modules/users/useCases/createUser/createUserController.js";
import { errosAssincronos } from "../middlewares/erros.js";
import loginController from "../modules/users/useCases/loginUser/loginController.js";
import { createPlantController } from "../modules/plants/use-cases/createPlant/createPlantController.js";
import { createRecordController } from "../modules/records/use-cases/CreateRecord/CreateRecordController.js";
import { findAllByPlantIdController } from "../modules/records/use-cases/FindAllByPlantId/findAllByPlantIdController.js";
import { getSaudeByIdController } from "../modules/plants/use-cases/getSaudeById/getSaudeByIdController.js";
import { getPlantasByDonoController } from "../modules/plants/use-cases/getPlantasByDonoID/getPlantasByDonoController.js";


const routes = Router();

/**
 * @swagger
 * /api/exemplo:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
*/

routes.get('/api/exemplo', (req, res) => {
  res.status(200).json({ mensagem: 'Rota de exemplo' });
});

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

routes.get("/saude/:id", errosAssincronos(async (request, response) => {
  return await getSaudeByIdController(request, response);
}))

routes.get("/plantas/buscar/:id", errosAssincronos(async (request, response) => {
  return await getPlantasByDonoController(request, response);
}));

export default routes;