import { Injectable } from '@nestjs/common';
import { IRegistroPlanta, IRelatorioSaude } from './relatorio-saude.types';
import { GraphQLError } from 'graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UserType } from 'src/modules/users/user.type';

@Injectable()
export class GetSaudeByIdService {

    constructor(private readonly prismaService: PrismaService){}

    public async getSaude(id, usuario: UserType): Promise<IRelatorioSaude>{

        await this.prismaService.$connect();

        const planta = await this.prismaService.plantas.findUnique({where:{id}});

        if(!planta) throw new GraphQLError("A planta não existe");

        if(planta.idDono !== usuario.id) throw new GraphQLError("Usuário não autorizado");

        const ultimoRegistro = await this.prismaService.registros.findFirst({where:{idPlanta: id}, orderBy: {dataDeRegistro: 'desc'}});

        if(!ultimoRegistro){
            throw new GraphQLError("A planta não possui nenhum registro");
        }

        await this.prismaService.$disconnect();

        return this.gerarRelatorioDeSaude(ultimoRegistro);

    }

    private gerarRelatorioDeSaude(ultimoRegistro: IRegistroPlanta): IRelatorioSaude{
        
            let pontuacao = 0;
            let alertas = [];
        
            const avaliarSaude = (valor: number, faixaBaixa: number, faixaSaudavel: number, nomeVariavel: string) => {
                valor = Number(valor);
                if (valor < faixaBaixa) {
                    pontuacao += 1;
                    switch (nomeVariavel) {
                        case "nitrogênio":
                            alertas.push("Deficiência de nitrogênio pode afetar negativamente a planta. A faixa saudável para o Manjericão é entre 50 a 200mg/Kg.");
                            break;
                        case "fósforo":
                            alertas.push("Deficiência de fósforo pode prejudicar o desenvolvimento da planta. A faixa saudável para o Manjericão é entre 30 a 75mg/Kg.");
                            break;
                        case "potássio":
                            alertas.push("Deficiência de potássio pode impactar a saúde da planta. A faixa saudável para o Manjericão é entre 200 a 300mg/Kg.");
                            break;
                        case "temperatura":
                            alertas.push("Temperaturas abaixo de 10°C podem ser prejudiciais para o manjericão. Evite temperaturas muito baixas.");
                            break;
                        case "umidade":
                            alertas.push("Umidade do ar abaixo de 50% pode levar à desidratação da planta. Monitore a umidade do solo.");
                            break;
                        case "pH":
                            alertas.push("pH do solo abaixo de 6.0 pode dificultar a absorção de nutrientes pela planta. Faça correções no solo.");
                            break;
                        case "luz":
                            alertas.push("Atenção: Sua planta pode não estar recebendo luz suficiente! Isso pode afetar negativamente o seu crescimento e saúde. Certifique-se de colocá-la em um local com mais luz solar ou considere o uso de luzes artificiais de crescimento.")
                            break;
                        default:
                            alertas.push(`Deficiência de ${nomeVariavel} pode afetar negativamente a planta. Consulte um especialista em nutrição vegetal.`);
                    }
                    return "Deficiência";
                } else if (valor >= faixaBaixa && valor <= faixaSaudavel) {
                    return "Saudável";
                } else {
                    pontuacao += 1;
                    switch (nomeVariavel) {
                        case "nitrogênio":
                            alertas.push("Excesso de nitrogênio pode prejudicar a saúde da planta. A faixa saudável para o Manjericão é entre 50 a 200mg/Kg.");
                            break;
                        case "fósforo":
                            alertas.push("Excesso de fósforo pode causar desequilíbrios no solo. A faixa saudável para o Manjericão é entre 30 a 75mg/Kg.");
                            break;
                        case "potássio":
                            alertas.push("Excesso de potássio pode prejudicar a absorção de outros nutrientes pela planta. A faixa saudável para o Manjericão é entre 200 a 300mg/Kg.");
                            break;
                        case "temperatura":
                            alertas.push("Temperaturas acima de 35°C podem causar estresse térmico na planta. Evite temperaturas muito altas.");
                            break;
                        case "umidade":
                            alertas.push("Umidade do ar acima de 75% pode aumentar o risco de doenças fúngicas, como o oídio. Monitore a umidade do solo.");
                            break;
                        case "pH":
                            alertas.push("pH do solo acima de 7.0 pode resultar em deficiência de nutrientes e desequilíbrios no solo. Faça correções no solo.");
                            break;
                        case "luz":
                            alertas.push("Problemas com o sensor de luz, procure o suporte");
                        default:
                            alertas.push(`Excesso de ${nomeVariavel} pode prejudicar a saúde da planta. Consulte um especialista em nutrição vegetal.`);
                    }
                    return "Excesso";
                }
            }
        
            let nitrogenio = avaliarSaude(Number(ultimoRegistro.nitrogenio), 50, 200, "nitrogênio");
            let fosforo = avaliarSaude(Number(ultimoRegistro.fosforo), 30, 75, "fósforo");
            let potassio = avaliarSaude(Number(ultimoRegistro.potassio), 200, 300, "potássio");
            let temperatura = avaliarSaude(Number(ultimoRegistro.temperatura), 10, 35, "temperatura");
            let umidade = avaliarSaude(Number(ultimoRegistro.umidade), 50, 70, "umidade");
            let pH = avaliarSaude(Number(ultimoRegistro.pH), 6, 7, "pH");
            let luz = avaliarSaude(Number(ultimoRegistro.luz),50, 101, "luz" );
        
            let estadoGeral = "Ruim";
            switch (pontuacao){
                case 0: 
                estadoGeral = "Excelente!";
                break;
                case 1: 
                estadoGeral = "Bom";
                break;
                case 2: 
                estadoGeral = "Regular";
                break;            
            } 
        
            const ultimaAtualizacao = ultimoRegistro.dataDeRegistro;
        
            return { nitrogenio, fosforo, potassio, luz,  umidade, temperatura, pH, estadoGeral, ultimaAtualizacao, alertas };
        };
        
    
}
