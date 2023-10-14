import { findAllByPlantIdService } from "./findAllByPlantIdService.js";

export const findAllByPlantIdController = async(request, response) => {
    const idPlanta  = request.params.idPlanta;
    const { intervaloDeDias, intervaloDeBusca } = request.query;
    const registros = await findAllByPlantIdService(idPlanta, intervaloDeDias, intervaloDeBusca);
    response.status(200).json(registros);
} 