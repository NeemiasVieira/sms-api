import { deleteAllLogsService } from "./deleteAllLogsService.js";

export const deleteAllLogsController = async (request, response) => {
    await deleteAllLogsService();
    return response.status(204).send();
}