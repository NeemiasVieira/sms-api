import { updateRecordByIDService } from "./updateRecordByIDService.js";

export const updateRecordByIDController = async(request, response) => {
    const id = request.params.id;
    const { nitrogenio, fosforo, potassio, umidade, temperatura, pH } = request.body;
    const resposta = await updateRecordByIDService(id, nitrogenio, fosforo, potassio, umidade, temperatura, pH);
    return response.status(200).json(resposta);
}