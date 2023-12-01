// Arquivo: models.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  nome: String,
  senha: String,
  dataDeCriacao: { type: Date, default: Date.now },
});

const plantaSchema = new mongoose.Schema({
  idDono: String,
  nome: String,
  especie: String,
  dataDaPlantacao: Date,
});

const logSchema = new mongoose.Schema({
  request: String,
  response: String,
  time: String,
  data: mongoose.Schema.Types.Mixed,
});

const registroSchema = new mongoose.Schema({
  idPlanta: String,
  nitrogenio: String,
  fosforo: String,
  potassio: String,
  umidade: String,
  temperatura: String,
  pH: String,
  dataDeRegistro: Date,
});

const User = mongoose.model('User', userSchema);
const Planta = mongoose.model('Planta', plantaSchema);
const Log = mongoose.model('Log', logSchema);
const Registro = mongoose.model('Registro', registroSchema);

export { User, Planta, Log, Registro };
