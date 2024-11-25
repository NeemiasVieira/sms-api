import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { GraphQLError } from 'graphql';
import * as path from 'path';
import * as puppeteer from 'puppeteer';
import { PrismaService } from '../../../../database/prisma/prisma.service';
import { FormatarDatas } from '../../../../utils/FormatarDatas';
import { SpecieMapper } from '../../../species/specie-mapper.service';
import { UserType } from '../../../users/user.type';
import { formatarExibicao, getInfoColor, valoresPDF } from './contract';

@Injectable()
export class GeneratePdfService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly specieMapper: SpecieMapper
  ) {}

  async generate(recordId: string, usuario: UserType): Promise<string> {
    await this.prisma.$connect();

    const record = await this.prisma.registros.findUnique({
      where: { id: recordId, dataDeExclusao: null },
    });

    if (!record) throw new GraphQLError('Nenhum registro encontrado');

    const planta = await this.prisma.plantas.findUnique({
      where: { id: record.idPlanta, dataDeExclusao: null },
    });

    if (!planta) throw new GraphQLError('Planta não encontrada');

    if (planta.idDono !== usuario.id) throw new GraphQLError('Usuário não autorizado');

    const specie = await this.prisma.especies.findUnique({
      where: { id: planta.idEspecie, dataDeExclusao: null },
    });

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
        dataDeRegistro: FormatarDatas.completao(String(FormatarDatas.formatGMT(dataDeRegistro))),
      },
      especie,
      planta: {
        nome: planta.nome,
        id: planta.id,
        dataDePlantacao: FormatarDatas.diaMesAno(String(planta.dataDaPlantacao)),
      },
    };

    const html = this.generateHtml(values);

    return this.generatePdf(html);
  }

  private async generatePdf(html: string): Promise<string> {
    try {
      const browserOptions =
        process.platform === 'linux'
          ? {
              headless: true,
              defaultViewport: null,
              executablePath: '/usr/bin/google-chrome',
              args: ['--no-sandbox'],
            }
          : {};
      const browser = await puppeteer.launch(browserOptions);
      const page = await browser.newPage();
      await page.setContent(html);

      const buffer = await page.pdf({
        format: 'A4',
        printBackground: true,
      });

      await browser.close();

      return Buffer.from(buffer).toString('base64');
    } catch (error) {
      console.log('Erro inesperado ao gerar o PDF: ', error);
      throw new GraphQLError('Erro inesperado ao gerar o PDF');
    }
  }

  private generateHtml(values: valoresPDF): string {
    const template = fs.readFileSync(path.join(__dirname, 'template-pdf.html'), 'utf8');

    const imageTemplateHTML = values.registro.imagem
      ? `<img
           src="${values.registro.imagem}"
           alt="Não foi possível carregar a imagem da planta"
           class="plantImage"
          />`
      : `<img
          src="https://www.softar.com.br/application/views/images/naodisponivel.png"
          alt="Não foi possível carregar a imagem da planta"
          class="plantImage"
         />`;

    const nitrogenioClass = getInfoColor(values.registro.nitrogenio, values.especie.parametros.nitrogenio);
    const fosforoClass = getInfoColor(values.registro.fosforo, values.especie.parametros.fosforo);
    const potassioClass = getInfoColor(values.registro.potassio, values.especie.parametros.potassio);
    const luzClass = getInfoColor(values.registro.lux, values.especie.parametros.luz);
    const umidadeClass = getInfoColor(values.registro.umidade, values.especie.parametros.umidade);
    const temperaturaClass = getInfoColor(values.registro.temperatura, values.especie.parametros.temperatura);
    const pHClass = getInfoColor(values.registro.pH, values.especie.parametros.pH);

    const numbersPlaceholders: Record<string, string> = {
      '{{especie.parametros.nitrogenio.min}}': values.especie.parametros.nitrogenio.min,
      '{{especie.parametros.nitrogenio.max}}': values.especie.parametros.nitrogenio.max,
      '{{registro.nitrogenio}}': values.registro.nitrogenio,
      '{{especie.parametros.fosforo.min}}': values.especie.parametros.fosforo.min,
      '{{especie.parametros.fosforo.max}}': values.especie.parametros.fosforo.max,
      '{{registro.fosforo}}': values.registro.fosforo,
      '{{especie.parametros.potassio.min}}': values.especie.parametros.potassio.min,
      '{{especie.parametros.potassio.max}}': values.especie.parametros.potassio.max,
      '{{registro.potassio}}': values.registro.potassio,
      '{{especie.parametros.luz.min}}': values.especie.parametros.luz.min,
      '{{especie.parametros.luz.max}}': values.especie.parametros.luz.max,
      '{{registro.luz}}': values.registro.lux,
      '{{especie.parametros.umidade.min}}': values.especie.parametros.umidade.min,
      '{{especie.parametros.umidade.max}}': values.especie.parametros.umidade.max,
      '{{registro.umidade}}': values.registro.umidade,
      '{{especie.parametros.temperatura.min}}': values.especie.parametros.temperatura.min,
      '{{especie.parametros.temperatura.max}}': values.especie.parametros.temperatura.max,
      '{{registro.temperatura}}': values.registro.temperatura,
      '{{especie.parametros.pH.min}}': values.especie.parametros.pH.min,
      '{{especie.parametros.pH.max}}': values.especie.parametros.pH.max,
      '{{registro.pH}}': values.registro.pH,
    };

    const stringsPlaceholders: Record<string, string> = {
      '{{dataDeRegistro}}': values.registro.dataDeRegistro,
      '{{usuario.id}}': values.usuario.id,
      '{{planta.id}}': values.planta.id,
      '{{especie.id}}': values.especie.id,
      '{{especie.nome}}': values.especie.nome,
      '{{registro.imagem}}': imageTemplateHTML,
      '{{registro.diagnostico}}': values.registro.diagnostico ?? 'Este registro não teve um diagnóstico',
      '{{registro.id}}': values.registro.id,
      '{{usuario.nome}}': values.usuario.nome,
      '{{planta.nome}}': values.planta.nome,
      '{{planta.dataDePlantacao}}': values.planta.dataDePlantacao,
      '{{nitrogenioClass}}': nitrogenioClass,
      '{{fosforoClass}}': fosforoClass,
      '{{potassioClass}}': potassioClass,
      '{{luzClass}}': luzClass,
      '{{umidadeClass}}': umidadeClass,
      '{{temperaturaClass}}': temperaturaClass,
      '{{pHClass}}': pHClass,
    };

    let resultHtml = Object.entries(numbersPlaceholders).reduce((acc, [key, value]) => {
      return acc.replace(new RegExp(key, 'g'), formatarExibicao(value));
    }, template);

    resultHtml = Object.entries(stringsPlaceholders).reduce((acc, [key, value]) => {
      return acc.replace(new RegExp(key, 'g'), value);
    }, resultHtml);

    return resultHtml;
  }
}
