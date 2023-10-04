import { createUserService } from "./createUserService.js";

export const createUserController = async(request, response) => {
    const {nome, email, senha} = request.body;
    const userario = await createUserService(nome, email, senha);
    return response.status(201).json(userario);
}