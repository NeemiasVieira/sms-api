import { createRecordService } from "./CreateRecordService.js";

export const createRecordController = async(request, response) => {
    const {idPlanta, nitrogenio, fosforo, potassio, umidade, temperatura, pH} = request.body;
    const registro = await createRecordService(idPlanta, nitrogenio, fosforo, potassio, umidade, temperatura, pH);
    response.status(201).json(registro);
}