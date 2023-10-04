import loginService from "./loginService.js";
import { jwtToken } from "../../../../middlewares/confereToken.js";

const loginController = async (request, response) => {
//   await jwtToken(request, response);  
  const { email, senha } = request.body;
  const respostaDoLogin = await loginService(email, senha);
  response.status(200).json(respostaDoLogin);
};

export default loginController;