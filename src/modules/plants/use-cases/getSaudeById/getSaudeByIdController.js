import { getSaudeByIdService } from "./getSaudeByIdService.js";


export const getSaudeByIdController = async(request, response) => {
    
    const id = request.params.id;

    const resposta = await getSaudeByIdService(id);

    return response.status(200).json(resposta);

}