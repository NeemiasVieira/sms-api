import { getAllLogsService } from "./getAllLogsService.js";

export const getAllLogsController = async(request, response) => {
    const logs = await getAllLogsService();
    return response.status(200).json(logs);
}