import { MyDate } from "../../../../assets/DateSaoPaulo.js";
import { User } from "../../../../database/prisma/schema.js";
import { ErroApp } from "../../../../middlewares/erros.js";
import { hash } from "bcrypt";

const senhaSegura = (senha) => {
  if (senha.length < 8 || !/[A-Z]/.test(senha) || !/[\W_]/.test(senha) || !/\d/.test(senha)) {
    return false;
  }
  return true;
};

const emailValido = (email) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

const criptografarSenha = async (senha) => hash(senha, Number(process.env.PASSWORD_SALT));

export const createUserService = async (nome, email, senha) => {

  try {
    if (!nome || !email || !senha) {
      throw new ErroApp(400, "Todos os campos são obrigatórios!");
    }

    // Verifica se o usuário já existe
    const usuarioExiste = await User.findOne({ email });

    // Se o usuário já existe, lançamos um erro
    if (usuarioExiste) {
      throw new ErroApp(400, "Usuário já existe");
    }

    if (!emailValido(email)) {
      throw new ErroApp(400, "E-mail inválido");
    }

    if (!senhaSegura(senha)) {
      throw new ErroApp(400, "A senha precisa conter pelo menos um caractere especial, uma letra maiúscula, 8 caracteres e um número, tente novamente.");
    }

    const senhaCriptografada = await criptografarSenha(senha);

    const dataDeCriacao = new MyDate();

    const newUser = await User.create({ nome, email, senha: senhaCriptografada, dataDeCriacao });

    return newUser;
    
  } catch (error) {
    throw new ErroApp(400, error.message);
  }
};
