import { Injectable } from '@nestjs/common';
import { UserType } from '../../../users/user.type';
import { PrismaService } from '../../../../database/prisma/prisma.service';
import { GraphQLError } from 'graphql';
import { SpecieMapper } from '../../../species/specie-mapper.service';
import { FormatarDatas } from '../../../../utils/FormatarDatas';
import * as pdf from 'html-pdf';
import * as fs from 'fs';
import * as path from 'path';

interface valoresPDF {
  usuario: {
    id: string;
    nome: string;
  };
  planta: {
    nome: string;
    id: string;
    dataDePlantacao: string;
  };
  especie: {
    id: string;
    nome: string;
    descricao: string;
    parametros: {
      nitrogenio: {
        min: string;
        max: string;
      };
      fosforo: {
        min: string;
        max: string;
      };
      potassio: {
        min: string;
        max: string;
      };
      luz: {
        min: string;
        max: string;
      };
      umidade: {
        min: string;
        max: string;
      };
      temperatura: {
        min: string;
        max: string;
      };
      pH: {
        min: string;
        max: string;
      };
    };
  };
  registro: {
    id: string;
    idPlanta: string;
    nomeEspecie: string;
    nitrogenio: string;
    fosforo: string;
    potassio: string;
    umidade: string;
    temperatura: string;
    pH: string;
    luz: string;
    lux: string;
    dataDeRegistro: string;
    imagem: string;
    diagnostico: string;
  };
}

@Injectable()
export class GeneratePdfService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly specieMapper: SpecieMapper,
  ) {}

  async generate(recordId: string, usuario: UserType): Promise<string> {
    await this.prisma.$connect();

    const record = await this.prisma.registros.findUnique({ where: { id: recordId } });

    if (!record) throw new GraphQLError('Nenhum registro encontrado');

    const planta = await this.prisma.plantas.findUnique({ where: { id: record.idPlanta } });

    if (!planta) throw new GraphQLError('Planta não encontrada');

    if (planta.idDono !== usuario.id) throw new GraphQLError('Usuário não autorizado');

    const specie = await this.prisma.especies.findFirst({ where: { nome: planta.especie } });

    if (!specie) throw new GraphQLError('Espécie não encontrada');

    const especie = this.specieMapper.reverseMapParametros(specie);

    const { dataDeRegistro, ...recordData } = record;

    const values: valoresPDF = {
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
      },
      registro: {
        ...recordData,
        dataDeRegistro: FormatarDatas.completao(String(dataDeRegistro)),
      },
      especie,
      planta: {
        nome: planta.nome,
        id: planta.id,
        dataDePlantacao: FormatarDatas.diaMesAno(String(planta.dataDaPlantacao)),
      },
    };

    const html = this.generateHtml(values);

    return new Promise((resolve, reject) => {
      pdf.create(html).toBuffer((err, buffer) => {
        if (err) return reject(err);
        const base64 = buffer.toString('base64');
        resolve(base64);
      });
    });
  }

  private generateHtml(values: valoresPDF): string {
    const template = fs.readFileSync(path.join(__dirname, 'template-pdf.html'), 'utf8');
    return template
      .replace('{{dataDeRegistro}}', values.registro.dataDeRegistro)
      .replace('{{usuario.id}}', values.usuario.id)
      .replace('{{planta.id}}', values.planta.id)
      .replace('{{especie.id}}', values.especie.id)
      .replace('{{registro.id}}', values.registro.id)
      .replace('{{usuario.nome}}', values.usuario.nome)
      .replace('{{planta.nome}}', values.planta.nome)
      .replace('{{planta.dataDePlantacao}}', values.planta.dataDePlantacao)
      .replace('{{especie.parametros.nitrogenio.min}}', values.especie.parametros.nitrogenio.min)
      .replace('{{especie.parametros.nitrogenio.max}}', values.especie.parametros.nitrogenio.max)
      .replace('{{registro.nitrogenio}}', values.registro.nitrogenio)
      .replace('{{especie.parametros.fosforo.min}}', values.especie.parametros.fosforo.min)
      .replace('{{especie.parametros.fosforo.max}}', values.especie.parametros.fosforo.max)
      .replace('{{registro.fosforo}}', values.registro.fosforo)
      .replace('{{especie.parametros.potassio.min}}', values.especie.parametros.potassio.min)
      .replace('{{especie.parametros.potassio.max}}', values.especie.parametros.potassio.max)
      .replace('{{registro.potassio}}', values.registro.potassio)
      .replace('{{especie.parametros.luz.min}}', values.especie.parametros.luz.min)
      .replace('{{especie.parametros.luz.max}}', values.especie.parametros.luz.max)
      .replace('{{registro.luz}}', values.registro.luz)
      .replace('{{especie.parametros.umidade.min}}', values.especie.parametros.umidade.min)
      .replace('{{especie.parametros.umidade.max}}', values.especie.parametros.umidade.max)
      .replace('{{registro.umidade}}', values.registro.umidade)
      .replace('{{especie.parametros.temperatura.min}}', values.especie.parametros.temperatura.min)
      .replace('{{especie.parametros.temperatura.max}}', values.especie.parametros.temperatura.max)
      .replace('{{registro.temperatura}}', values.registro.temperatura)
      .replace('{{especie.parametros.pH.min}}', values.especie.parametros.pH.min)
      .replace('{{especie.parametros.pH.max}}', values.especie.parametros.pH.max)
      .replace('{{registro.pH}}', values.registro.pH);
  }
}
