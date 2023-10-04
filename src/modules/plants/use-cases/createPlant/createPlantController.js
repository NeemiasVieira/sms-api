import { createPlantService } from "./createPlantService.js";

export const createPlantController = async(request, response) => {
    const { especie } = request.body;
    const planta = await createPlantService(especie);
    response.status(201).json(planta);
}