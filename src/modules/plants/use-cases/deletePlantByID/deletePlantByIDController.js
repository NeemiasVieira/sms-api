import { deletePlantByIDService } from "./deletePlantByIDService.js";


export const deletePlantByIDController = async(request, response) => {
    const id = request.params.id;
    await deletePlantByIDService(id);
    return response.status(204).send();

}