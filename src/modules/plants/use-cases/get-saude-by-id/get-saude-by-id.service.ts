import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { SpecieMapper } from 'src/modules/species/specie-mapper.service';
import { Specie } from 'src/modules/species/specie.type';
import { UserType } from 'src/modules/users/user.type';
import { IRegistroPlanta, IRelatorioSaude } from './relatorio-saude.types';

/* eslint-disable max-len */

@Injectable()
export class GetSaudeByIdService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly specieMapper: SpecieMapper
  ) {}

  public async getSaude(usuario: UserType, idPlanta?: string, idRegistro?: string): Promise<IRelatorioSaude> {
    await this.prismaService.$connect();

    const { registro, especie } = await this.verificarDados(usuario, idPlanta, idRegistro);

    await this.prismaService.$disconnect();

    if (!registro) {
      return null;
    }

    return this.gerarRelatorioDeSaude(registro, especie);
  }

  private verificarDados = async (usuario: UserType, idPlanta?: string, idRegistro?: string) => {
    if (idPlanta && idRegistro)
      throw new GraphQLError('Escolha apenas um tipo de consulta passando apenas um argumento opcional');

    if (!idPlanta && !idRegistro)
      throw new GraphQLError('É necessário passar um registro ou uma planta para a service de relatório de saúde');

    if (idPlanta && !idRegistro) {
      const planta = await this.prismaService.plantas.findUnique({
        where: { id: idPlanta, dataDeExclusao: null },
      });

      if (!planta) throw new GraphQLError('A planta não existe');

      if (planta.idDono !== usuario.id) throw new GraphQLError('Usuário não autorizado');

      const especie = await this.getEspecie(planta.idEspecie);

      const registro = await this.prismaService.registros.findFirst({
        where: { idPlanta, dataDeExclusao: null },
        orderBy: { dataDeRegistro: 'desc' },
      });

      return { registro, especie };
    }

    const registro = await this.prismaService.registros.findUnique({
      where: { id: idRegistro, dataDeExclusao: null },
    });

    if (!registro) throw new GraphQLError('Nenhum registro encontrado.');

    const planta = await this.prismaService.plantas.findUnique({
      where: { id: registro.idPlanta, dataDeExclusao: null },
    });

    if (!planta) throw new GraphQLError('Nenhuma planta encontrada');

    if (planta.idDono !== usuario.id) throw new GraphQLError('Usuário não autorizado');

    const especie = await this.getEspecie(planta.idEspecie);

    return { registro, especie };
  };

  private async getEspecie(idEspecie: string) {
    const especie = await this.prismaService.especies.findUnique({
      where: { id: idEspecie, dataDeExclusao: null },
    });
    if (!especie) throw new GraphQLError('Nenhuma espécie encontrada');
    return this.specieMapper.reverseMapParametros(especie);
  }

  private gerarRelatorioDeSaude(registro: IRegistroPlanta, specie: Specie): IRelatorioSaude {
    const p = specie.parametros;

    const v = {
      nitrogenio: {
        min: Number(p.nitrogenio.min),
        max: Number(p.nitrogenio.max),
      },
      fosforo: {
        min: Number(p.fosforo.min),
        max: Number(p.fosforo.max),
      },
      potassio: {
        min: Number(p.potassio.min),
        max: Number(p.potassio.max),
      },
      luz: {
        min: Number(p.luz.min),
        max: Number(p.luz.max),
      },
      umidade: {
        min: Number(p.umidade.min),
        max: Number(p.umidade.max),
      },
      temperatura: {
        min: Number(p.temperatura.min),
        max: Number(p.temperatura.max),
      },
      pH: {
        min: Number(p.pH.min),
        max: Number(p.pH.max),
      },
    };

    let pontuacao = 0;
    const alertas = [];

    const avaliarSaude = (valor: number, faixaBaixa: number, faixaSaudavel: number, nomeVariavel: string) => {
      valor = Number(valor);
      if (valor < faixaBaixa) {
        pontuacao += 1;
        switch (nomeVariavel) {
          case 'nitrogênio':
            alertas.push(
              `Deficiência de nitrogênio pode afetar negativamente a planta. A faixa saudável para o(a) ${specie.nome} é entre ${v.nitrogenio.min} a ${v.nitrogenio.max}mg/Kg.`
            );
            break;
          case 'fósforo':
            alertas.push(
              `Deficiência de fósforo pode prejudicar o desenvolvimento da planta. A faixa saudável para o(a) ${specie.nome} é entre ${v.fosforo.min} a ${v.fosforo.max}mg/Kg.`
            );
            break;
          case 'potássio':
            alertas.push(
              `Deficiência de potássio pode impactar a saúde da planta. A faixa saudável para o(a) ${specie.nome} é entre ${v.potassio.min} a ${v.potassio.max}mg/Kg.`
            );
            break;
          case 'temperatura':
            alertas.push(
              `Temperaturas abaixo de ${v.temperatura.min}°C podem ser prejudiciais para o(a) ${specie.nome}. Evite temperaturas muito baixas.`
            );
            break;
          case 'umidade':
            alertas.push(
              `Umidade do ar abaixo de ${v.umidade.min}% pode levar à desidratação da planta. Monitore a umidade do solo.`
            );
            break;
          case 'pH':
            alertas.push(
              `pH do solo abaixo de ${v.pH.min} pode dificultar a absorção de nutrientes pela planta. Faça correções no solo.`
            );
            break;
          case 'luz':
            alertas.push(
              'Atenção: Sua planta pode não estar recebendo luz suficiente! Isso pode afetar negativamente o seu crescimento e saúde. Certifique-se de colocá-la em um local com mais luz solar ou considere o uso de luzes artificiais de crescimento.'
            );
            break;
          default:
            alertas.push(
              `Deficiência de ${nomeVariavel} pode afetar negativamente a planta. Consulte um especialista em nutrição vegetal.`
            );
        }
        return 'Deficiência';
      } else if (valor >= faixaBaixa && valor <= faixaSaudavel) {
        return 'Saudável';
      } else {
        pontuacao += 1;
        switch (nomeVariavel) {
          case 'nitrogênio':
            alertas.push(
              `Excesso de nitrogênio pode prejudicar a saúde da planta. A faixa saudável para o(a) ${specie.nome} é entre ${v.nitrogenio.min} a ${v.nitrogenio.max}.`
            );
            break;
          case 'fósforo':
            alertas.push(
              `Excesso de fósforo pode causar desequilíbrios no solo. A faixa saudável para o(a) ${specie.nome} é entre ${v.fosforo.min} a ${v.fosforo.max}mg/Kg.`
            );
            break;
          case 'potássio':
            alertas.push(
              `Excesso de potássio pode prejudicar a absorção de outros nutrientes pela planta. A faixa saudável para o(a) ${specie.nome} é entre ${v.potassio.min} a ${v.potassio.max}mg/Kg.`
            );
            break;
          case 'temperatura':
            alertas.push(
              `Temperaturas acima de ${v.temperatura.max}°C podem causar estresse térmico na planta. Evite temperaturas muito altas.`
            );
            break;
          case 'umidade':
            alertas.push(
              `Umidade do ar acima de ${v.umidade.max}% pode aumentar o risco de doenças fúngicas, como o oídio. Monitore a umidade do solo.`
            );
            break;
          case 'pH':
            alertas.push(
              `pH do solo acima de ${v.pH.max} pode resultar em deficiência de nutrientes e desequilíbrios no solo. Faça correções no solo.`
            );
            break;
          case 'luz':
            alertas.push('Excesso de luminosidade');
            break;
          default:
            alertas.push(
              `Excesso de ${nomeVariavel} pode prejudicar a saúde da planta. Consulte um especialista em nutrição vegetal.`
            );
        }
        return 'Excesso';
      }
    };

    const nitrogenio = avaliarSaude(Number(registro.nitrogenio), v.nitrogenio.min, v.nitrogenio.max, 'nitrogênio');
    const fosforo = avaliarSaude(Number(registro.fosforo), v.fosforo.min, v.fosforo.max, 'fósforo');
    const potassio = avaliarSaude(Number(registro.potassio), v.potassio.min, v.fosforo.max, 'potássio');
    const temperatura = avaliarSaude(Number(registro.temperatura), v.temperatura.min, v.temperatura.max, 'temperatura');
    const umidade = avaliarSaude(Number(registro.umidade), v.umidade.min, v.umidade.max, 'umidade');
    const pH = avaliarSaude(Number(registro.pH), v.pH.min, v.pH.max, 'pH');
    const luz = avaliarSaude(Number(registro.lux), v.luz.min, v.luz.max, 'luz');

    let estadoGeral = 'Ruim';
    switch (pontuacao) {
      case 0:
        estadoGeral = 'Excelente!';
        break;
      case 1:
        estadoGeral = 'Bom';
        break;
      case 2:
        estadoGeral = 'Regular';
        break;
    }

    const ultimaAtualizacao = registro.dataDeRegistro;
    const { diagnostico, imagem } = registro;

    return {
      nitrogenio,
      fosforo,
      potassio,
      luz,
      umidade,
      temperatura,
      pH,
      estadoGeral,
      ultimaAtualizacao,
      alertas,
      diagnostico,
      imagem,
    };
  }
}
