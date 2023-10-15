import { getUltimoRegistroService } from "./getUltimoRegistroService.js"

export const getUltimoRegistroController = async(request, response) => {
    const id = request.params.id;
    const resposta = await getUltimoRegistroService(id);
    return response.status(200).json(resposta);

}