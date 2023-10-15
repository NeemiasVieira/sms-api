import { updatePlantByIDService } from "./updatePlantByIDService.js";


export const updatePlantByIDController = async(request, response) => {
    const id = request.params.id;
    const {nome, especie} = request.body;
    const resposta = await updatePlantByIDService(id, nome, especie);
    return response.status(200).json(resposta);
}