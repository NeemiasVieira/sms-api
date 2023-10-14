import { Router } from "express";
import { errosAssincronos } from "../middlewares/erros.js";
import { findAllByPlantIdController } from "../modules/records/use-cases/FindAllByPlantId/findAllByPlantIdController.js";
import { createRecordController } from "../modules/records/use-cases/CreateRecord/CreateRecordController.js";
import { deleteRecordByIDController } from "../modules/records/use-cases/DeleteRecordByID/deleteRecordByIDController.js";
import { updateRecordByIDController } from "../modules/records/use-cases/updateRecordByID/updateRecordByIDController.js";

export const recordsRoutes = Router();

recordsRoutes.post(
  "/",
  errosAssincronos(async (request, response) => {
    await createRecordController(request, response);
  })
);

recordsRoutes.get(
  "/:idPlanta",
  errosAssincronos(async (request, response) => {
    await findAllByPlantIdController(request, response);
  })
);

recordsRoutes.delete(
  "/:id",
  errosAssincronos(async (request, response) => {
    return await deleteRecordByIDController(request, response);
  })
);

recordsRoutes.patch("/:id", errosAssincronos(async(request, response) => {
    return await updateRecordByIDController(request, response);
}))
