import { Router } from "express";
import { deleteAllLogsController } from "../modules/logs/use-cases/deleteAllLogs/deleteAllLogsController.js";
import { getAllLogsController } from "../modules/logs/use-cases/getAllLogs/getAllLogsController.js";

export const logsRoutes = Router();

logsRoutes.get("/", async (request, response) => {
  return await getAllLogsController(request, response);
});

logsRoutes.delete("/", async (request, response) => {
    return await deleteAllLogsController(request, response);
});
