import { Router } from "express";
import { loginController } from "../modules/users/useCases/loginUser/loginController.js";
import { createUserController } from "../modules/users/useCases/createUser/createUserController.js";
import { errosAssincronos } from "../middlewares/erros.js";

export const usersRoutes = Router();

usersRoutes.post(
  "/",
  errosAssincronos(async (request, response) => {
    await createUserController(request, response);
  })
);

usersRoutes.post(
  "/login",
  errosAssincronos(async (request, response) => {
    await loginController(request, response);
  })
);
