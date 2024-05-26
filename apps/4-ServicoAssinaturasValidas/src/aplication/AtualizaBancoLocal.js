import { validate } from 'bycontract';
import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoAssinaturasValidas } from '../domain/services/ServicoAssinaturasValidas';
import { AppService } from '../domain/services/app.service';
import { firstValueFrom } from 'rxjs';


@Injectable()
@Dependencies(ServicoAssinaturasValidas, AppService)
export class AttBancoLocal {
  constructor(servicoAssinaturasValidas, appService) {
    validate(servicoAssinaturasValidas, ServicoAssinaturasValidas);
    validate(appService, AppService);
    this.servicoAssinaturasValidas = servicoAssinaturasValidas;
    this.appService = appService;
  }

  async run() {
    let dadosAtualizados = await this.appService.servicoCadastramento('getAssinaturas', { tipo: 'TODAS' })        // Utiliza a requisicao já existente no serviço cadastramento
    dadosAtualizados                                                                                              // que retorna conforme o tipo/status, então enviamos o tipo: TODAS,
      .subscribe({                                                                                                // retornando assim todas as assinaturas existentes.
        next: (dadosAtualizados) => {
          const dadosTransformados = dadosAtualizados.map(assinatura => ({        // Converte o codApp e codCli apenas para o número, 
            ...assinatura,                                                        // não um objeto, como estava sendo recebido.
            codApp: assinatura.codApp.codigo,
            codCli: assinatura.codCli.codigo
          }));
          this.servicoAssinaturasValidas.syncAss(dadosTransformados);
        },
        error: (error) => {
          console.error('Erro: ', error);
        }
      });
  }
}