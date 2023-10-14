import { Router } from "express";
import { plantsRoutes } from "../routes/plants.js";
import { usersRoutes } from "../routes/users.js";
import { recordsRoutes } from "../routes/records.js";

const routes = Router();

routes.use("/usuarios", usersRoutes);
routes.use("/plantas", plantsRoutes);
routes.use("/registros", recordsRoutes)

export default routes;