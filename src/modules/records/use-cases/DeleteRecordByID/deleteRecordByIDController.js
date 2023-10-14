import { deleteRecordByIDService } from "./deleteRecordByIDService.js";

export const deleteRecordByIDController = async(request, response) => {
    const id = request.params.id;
    await deleteRecordByIDService(id);
    return response.status(204).send();
}