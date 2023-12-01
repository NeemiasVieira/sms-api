import { ErroApp } from "../../../../middlewares/erros.js";
import { compare } from "bcrypt";
import { User } from "../../../../database/prisma/schema.js";
import pkg from "jsonwebtoken";
const { sign } = pkg;

const loginService = async (email, senha) => {
  try {
    email = email.toLowerCase();

    const usuarioExiste = await User.findOne({ email });

    if (!usuarioExiste) {
      throw new ErroApp(401, "Usuário ou senha incorretos! Tente novamente.");
    }

    const senhaIncorreta = !(await compare(senha, usuarioExiste.senha));

    if (senhaIncorreta) {
      throw new ErroApp(401, "Usuário ou senha incorretos! Tente novamente.");
    }

    const token = sign({}, process.env.JWT_SECRET, {
      subject: usuarioExiste.id,
      expiresIn: "1d",
    });

    return {
      resposta: `Usuário ${usuarioExiste.nome.split(" ")[0]} logado com sucesso!`,
      usuario: usuarioExiste,
      token,
    };
  } catch (error) {
    // Certifique-se de que a mensagem de erro seja registrada para análise
    console.error("Erro no serviço de login:", error.message);

    // Propague o erro para ser tratado no ponto de uso do serviço
    throw error;
  }
};

export default loginService;
