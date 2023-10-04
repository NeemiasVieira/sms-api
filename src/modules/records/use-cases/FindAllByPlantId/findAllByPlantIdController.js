import { findAllByPlantIdService } from "./findAllByPlantIdService.js";

export const findAllByPlantIdController = async(request, response) => {
    const idPlanta  = request.params.idPlanta;
    const registros = await findAllByPlantIdService(idPlanta);
    response.status(200).json(registros);
} 