import { createPlantService } from "./createPlantService.js";



export const createPlantController = async(request, response) => {
    const { idDono, especie, nome } = request.body;
    const planta = await createPlantService(idDono, nome, especie);
    response.status(201).json(planta);
}