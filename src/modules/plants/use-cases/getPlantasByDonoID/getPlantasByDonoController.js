import { getPlantasByDonoService } from "./getPlantasByDonoService.js";

export const getPlantasByDonoController = async (request, response) => {
    const id = request.params.id;
    const resposta = await getPlantasByDonoService(id);
    return response.status(200).json(resposta);

}