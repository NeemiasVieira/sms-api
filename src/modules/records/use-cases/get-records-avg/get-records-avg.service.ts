import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Record } from '../../record.type';
import { ValidationsService } from 'src/utils/validations.service';

@Injectable()
export class GetRecordsAvgService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validationService: ValidationsService
  ) {}

  async execute(idPlanta: string) {
    if (!this.validationService.isObjectId(idPlanta)) throw new GraphQLError('idPlanta inválido');

    const planta = await this.prisma.plantas.findUnique({ where: { id: idPlanta } });
    if (!planta) throw new GraphQLError('Planta não encontrada');

    const registrosPorMes = new Map<string, Record[]>();
    const registros = await this.prisma.registros.findMany({ where: { idPlanta } });

    registros.forEach((registro) => {
      const mesAno = registro.dataDeRegistro
        .toLocaleDateString('pt-BR', {
          year: '2-digit',
          month: 'short',
        })
        .replace('.', '')
        .replace(/(?:^|\s)\S/g, (c) => c.toUpperCase())
        .replace(' De ', '/');

      if (!registrosPorMes.has(mesAno)) {
        registrosPorMes.set(mesAno, []);
      }
      registrosPorMes.get(mesAno)?.push(registro);
    });

    // Calcula a média e formata para cada grupo de registros
    const mediasPorMes = Array.from(registrosPorMes.entries()).map(([mesAno, registros]) => {
      const total = registros.length;

      const soma = registros.reduce(
        (acc, registro) => ({
          nitrogenio: acc.nitrogenio + parseFloat(registro.nitrogenio),
          fosforo: acc.fosforo + parseFloat(registro.fosforo),
          potassio: acc.potassio + parseFloat(registro.potassio),
          umidade: acc.umidade + parseFloat(registro.umidade),
          temperatura: acc.temperatura + parseFloat(registro.temperatura),
          pH: acc.pH + parseFloat(registro.pH),
          luz: acc.luz + parseFloat(registro.luz),
          lux: acc.lux + parseFloat(registro.lux),
        }),
        {
          nitrogenio: 0,
          fosforo: 0,
          potassio: 0,
          umidade: 0,
          temperatura: 0,
          pH: 0,
          luz: 0,
          lux: 0,
        }
      );

      const medias = {
        nitrogenio: parseFloat((soma.nitrogenio / total).toFixed(2)),
        fosforo: parseFloat((soma.fosforo / total).toFixed(2)),
        potassio: parseFloat((soma.potassio / total).toFixed(2)),
        umidade: parseFloat((soma.umidade / total).toFixed(2)),
        temperatura: parseFloat((soma.temperatura / total).toFixed(2)),
        pH: parseFloat((soma.pH / total).toFixed(2)),
        luz: parseFloat((soma.luz / total).toFixed(2)),
        lux: parseFloat((soma.lux / total).toFixed(2)),
      };

      return { mesAno, medias };
    });

    return mediasPorMes.sort((a, b) => {
      const [mesA, anoA] = a.mesAno.split('/');
      const [mesB, anoB] = b.mesAno.split('/');

      const dataA = new Date(Number(`20${anoA}`), this.getMonthIndex(mesA));
      const dataB = new Date(Number(`20${anoB}`), this.getMonthIndex(mesB));

      return dataA.getTime() - dataB.getTime();
    });
  }

  private getMonthIndex(mes: string): number {
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return meses.indexOf(mes);
  }
}
