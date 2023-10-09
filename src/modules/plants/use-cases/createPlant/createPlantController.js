import { createPlantService } from "./createPlantService.js";



export const createPlantController = async(request, response) => {
    const { especie, idDono } = request.body;
    const planta = await createPlantService(idDono, especie);
    response.status(201).json(planta);
}