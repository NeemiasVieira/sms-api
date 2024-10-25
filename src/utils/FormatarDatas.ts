const diasDaSemana = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
] as const;
const mesesDoAno = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
] as const;

export enum Environment {
  DEV = "development",
  PROD = "production",
}

type Dia = (typeof diasDaSemana)[number];
type Mes = (typeof mesesDoAno)[number];

export class FormatarDatas {
  static mapearDia(dia: number): Dia | undefined {
    if (dia >= 0 && dia < diasDaSemana.length) {
      return diasDaSemana[dia];
    } else {
      console.error("FormatarDatas: Índice do dia da semana inválido");
      return undefined;
    }
  }

  static mapearMes(mes: string): Mes | undefined {
    let indice = Number(mes);
    if (!isNaN(indice) && indice >= 0 && indice < mesesDoAno.length) {
      indice--;
      return mesesDoAno[indice];
    } else {
      console.error("FormatarDatas: Índice do mês do ano inválido");
      return undefined;
    }
  }

  static atualizadoA(dateStr: string) {
    const currentDate = new Date();
    const updatedDate = new Date(dateStr);
    const timeDiff: number = currentDate.getTime() - updatedDate.getTime();

    const minutes = Math.floor(timeDiff / 60000);
    if (minutes < 60) {
      return `Valores atualizados há ${minutes} minuto${minutes !== 1 ? "s" : ""}`;
    }

    const hours = Math.floor(timeDiff / 3600000);
    if (hours < 24) {
      return `Valores atualizados há ${hours} hora${hours !== 1 ? "s" : ""}`;
    }

    const days = Math.floor(timeDiff / 86400000);
    if (days < 7) {
      return `Valores atualizados há ${days} dia${days !== 1 ? "s" : ""}`;
    }

    const weeks = Math.floor(days / 7);
    if (weeks < 4) {
      return `Valores atualizados há ${weeks} semana${weeks !== 1 ? "s" : ""}`;
    }

    const months = Math.floor(days / 30);
    if (months !== 1) return `Valores atualizados há ${months} meses`;
    return `Atualizado há ${months} mês`;
  }

  static diaMes(inputDate: string) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  }

  static diaMesAno(inputDateString: string) {
    const date = new Date(inputDateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  static dataHoraMinuto(data: string) {
    const novaData = new Date(data);
    const dia = novaData.getDate().toString().padStart(2, "0");
    const mes = (novaData.getMonth() + 1).toString().padStart(2, "0");
    const ano = novaData.getFullYear();
    const hora = novaData.getHours().toString().padStart(2, "0");
    const minuto = novaData.getMinutes().toString().padStart(2, "0");

    return `${dia}/${mes}/${ano} - ${hora}:${minuto}h`;
  }

  static completao(data: string) {
    const novaData = new Date(data);
    const dia = novaData.getDate().toString().padStart(2, "0");
    const mes = (novaData.getMonth() + 1).toString().padStart(2, "0");
    const ano = novaData.getFullYear();
    const hora = novaData.getHours().toString().padStart(2, "0");
    const minuto = novaData.getMinutes().toString().padStart(2, "0");
    const day = novaData.getDay();

    return `${this.mapearDia(day)}, ${dia} de ${this.mapearMes(mes)} de ${ano} as ${hora}:${minuto}h`;
  }

  static isoToInputDate(isoDate: string) {
    if (!isoDate) return null;
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  static inputDateToIso(inputDate: string) {
    if (!inputDate) return null;
    const date = new Date(inputDate);
    return date.toISOString();
  }

  static formatGMT(date: Date) {
    if (process.env.NODE_ENV === Environment.PROD) {
      const hours = date.getUTCHours();
      date.setUTCHours(hours - 3);
    }
    return date;
  }
}
