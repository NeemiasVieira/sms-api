export const geraRelatorioDeSaude = (ultimoRegistro) => {
    let pontuacao = 0;
    let alertas = [];

    const avaliarSaude = (valor, faixaBaixa, faixaSaudavel, nomeVariavel) => {
        valor = Number(valor);
        if (valor < faixaBaixa) {
            pontuacao += 1;
            switch (nomeVariavel) {
                case "nitrogênio":
                    alertas.push("Alerta: Deficiência de nitrogênio pode afetar negativamente a planta. Consulte um especialista em nutrição vegetal.");
                    break;
                case "fósforo":
                    alertas.push("Alerta: Deficiência de fósforo pode prejudicar o desenvolvimento da planta. Consulte um especialista em nutrição vegetal.");
                    break;
                case "potássio":
                    alertas.push("Alerta: Deficiência de potássio pode impactar a saúde da planta. Consulte um especialista em nutrição vegetal.");
                    break;
                case "temperatura":
                    alertas.push("Alerta: Temperaturas abaixo de 10°C podem ser prejudiciais para o manjericão. Evite temperaturas muito baixas.");
                    break;
                case "umidade":
                    alertas.push("Alerta: Umidade do ar abaixo de 50% pode levar à desidratação da planta. Monitore a umidade ambiental.");
                    break;
                case "pH":
                    alertas.push("Alerta: pH do solo abaixo de 6.0 pode dificultar a absorção de nutrientes pela planta. Faça correções no solo.");
                    break;
                default:
                    alertas.push(`Alerta: Deficiência de ${nomeVariavel} pode afetar negativamente a planta. Consulte um especialista em nutrição vegetal.`);
            }
            return "Não saudável";
        } else if (valor >= faixaBaixa && valor <= faixaSaudavel) {
            return "Saudável";
        } else {
            pontuacao += 1;
            switch (nomeVariavel) {
                case "nitrogênio":
                    alertas.push("Alerta: Excesso de nitrogênio pode prejudicar a saúde da planta. Consulte um especialista em nutrição vegetal.");
                    break;
                case "fósforo":
                    alertas.push("Alerta: Excesso de fósforo pode causar desequilíbrios no solo. Consulte um especialista em nutrição vegetal.");
                    break;
                case "potássio":
                    alertas.push("Alerta: Excesso de potássio pode prejudicar a absorção de outros nutrientes pela planta. Consulte um especialista em nutrição vegetal.");
                    break;
                case "temperatura":
                    alertas.push("Alerta: Temperaturas acima de 35°C podem causar estresse térmico na planta. Evite temperaturas muito altas.");
                    break;
                case "umidade":
                    alertas.push("Alerta: Umidade do ar acima de 75% pode aumentar o risco de doenças fúngicas, como o oídio. Monitore a umidade ambiental.");
                    break;
                case "pH":
                    alertas.push("Alerta: pH do solo acima de 7.0 pode resultar em deficiência de nutrientes e desequilíbrios no solo. Faça correções no solo.");
                    break;
                default:
                    alertas.push(`Alerta: Excesso de ${nomeVariavel} pode prejudicar a saúde da planta. Consulte um especialista em nutrição vegetal.`);
            }
            return "Excesso";
        }
    }

    let nitrogenio = avaliarSaude(Number(ultimoRegistro.nitrogenio), 3.5, 4.5, "nitrogênio");
    let fosforo = avaliarSaude(Number(ultimoRegistro.fosforo), 0.5, 1.0, "fósforo");
    let potassio = avaliarSaude(Number(ultimoRegistro.potassio), 2.0, 4.0, "potássio");
    let temperatura = avaliarSaude(Number(ultimoRegistro.temperatura), 10, 35, "temperatura");
    let umidade = avaliarSaude(Number(ultimoRegistro.umidade), 50, 75, "umidade");
    let pH = avaliarSaude(Number(ultimoRegistro.pH), 6.0, 7.0, "pH");

    let estadoGeral = "Ruim";
    if (pontuacao >= 6 && pontuacao <= 8) {
        estadoGeral = "Regular";
    } else if (pontuacao >= 9 && pontuacao <= 11) {
        estadoGeral = "Bom";
    } else if (pontuacao >= 12) {
        estadoGeral = "Excelente!";
    }

    return { nitrogenio, fosforo, potassio, umidade, temperatura, pH, estadoGeral, alertas };
};
