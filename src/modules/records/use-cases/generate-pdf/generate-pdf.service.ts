import { Injectable } from "@nestjs/common";
import { UserType } from "../../../users/user.type";
import { PrismaService } from "../../../../database/prisma/prisma.service";
import { GraphQLError } from "graphql";
import { SpecieMapper } from "../../../species/specie-mapper.service";
import { FormatarDatas } from "../../../../utils/FormatarDatas";
import * as fs from "fs";
import * as path from "path";
import * as puppeteer from "puppeteer";
import { valoresPDF } from "./contract";

@Injectable()
export class GeneratePdfService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly specieMapper: SpecieMapper
  ) {}

  async generate(recordId: string, usuario: UserType): Promise<string> {
    await this.prisma.$connect();

    const record = await this.prisma.registros.findUnique({ where: { id: recordId } });

    if (!record) throw new GraphQLError("Nenhum registro encontrado");

    const planta = await this.prisma.plantas.findUnique({ where: { id: record.idPlanta } });

    if (!planta) throw new GraphQLError("Planta não encontrada");

    if (planta.idDono !== usuario.id) throw new GraphQLError("Usuário não autorizado");

    const specie = await this.prisma.especies.findFirst({ where: { nome: planta.especie } });

    if (!specie) throw new GraphQLError("Espécie não encontrada");

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
        process.platform === "linux"
          ? { headless: true, defaultViewport: null, executablePath: "/usr/bin/google-chrome", args: ["--no-sandbox"] }
          : {};
      const browser = await puppeteer.launch(browserOptions);
      const page = await browser.newPage();
      await page.setContent(html);

      const buffer = await page.pdf({
        format: "A4",
        printBackground: true,
      });

      await browser.close();

      return Buffer.from(buffer).toString("base64");
    } catch (error) {
      console.log("Erro inesperado ao gerar o PDF: ", error);
      throw new GraphQLError("Erro inesperado ao gerar o PDF");
    }
  }

  private generateHtml(values: valoresPDF): string {
    const template = fs.readFileSync(path.join(__dirname, "template-pdf.html"), "utf8");

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

    return template
      .replace("{{dataDeRegistro}}", values.registro.dataDeRegistro)
      .replace("{{usuario.id}}", values.usuario.id)
      .replace("{{planta.id}}", values.planta.id)
      .replace("{{especie.id}}", values.especie.id)
      .replace("{{especie.nome}}", values.especie.nome)
      .replace("{{registro.imagem}}", imageTemplateHTML)
      .replace("{{registro.diagnostico}}", values.registro.diagnostico ?? "Este registro não teve um diagnóstico")
      .replace("{{registro.id}}", values.registro.id)
      .replace("{{usuario.nome}}", values.usuario.nome)
      .replace("{{planta.nome}}", values.planta.nome)
      .replace("{{planta.dataDePlantacao}}", values.planta.dataDePlantacao)
      .replace("{{especie.parametros.nitrogenio.min}}", values.especie.parametros.nitrogenio.min)
      .replace("{{especie.parametros.nitrogenio.max}}", values.especie.parametros.nitrogenio.max)
      .replace("{{registro.nitrogenio}}", values.registro.nitrogenio)
      .replace("{{especie.parametros.fosforo.min}}", values.especie.parametros.fosforo.min)
      .replace("{{especie.parametros.fosforo.max}}", values.especie.parametros.fosforo.max)
      .replace("{{registro.fosforo}}", values.registro.fosforo)
      .replace("{{especie.parametros.potassio.min}}", values.especie.parametros.potassio.min)
      .replace("{{especie.parametros.potassio.max}}", values.especie.parametros.potassio.max)
      .replace("{{registro.potassio}}", values.registro.potassio)
      .replace("{{especie.parametros.luz.min}}", values.especie.parametros.luz.min)
      .replace("{{especie.parametros.luz.max}}", values.especie.parametros.luz.max)
      .replace("{{registro.luz}}", values.registro.luz)
      .replace("{{especie.parametros.umidade.min}}", values.especie.parametros.umidade.min)
      .replace("{{especie.parametros.umidade.max}}", values.especie.parametros.umidade.max)
      .replace("{{registro.umidade}}", values.registro.umidade)
      .replace("{{especie.parametros.temperatura.min}}", values.especie.parametros.temperatura.min)
      .replace("{{especie.parametros.temperatura.max}}", values.especie.parametros.temperatura.max)
      .replace("{{registro.temperatura}}", values.registro.temperatura)
      .replace("{{especie.parametros.pH.min}}", values.especie.parametros.pH.min)
      .replace("{{especie.parametros.pH.max}}", values.especie.parametros.pH.max)
      .replace("{{registro.pH}}", values.registro.pH);
  }
}
