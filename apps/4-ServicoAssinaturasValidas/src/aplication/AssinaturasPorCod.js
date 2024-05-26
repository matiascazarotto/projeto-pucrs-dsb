import { validate } from 'bycontract';
import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoAssinaturasValidas } from '../domain/services/ServicoAssinaturasValidas';

@Injectable()
@Dependencies(ServicoAssinaturasValidas)
export class AssinaturasPorCodigo {
  constructor(servicoAssinaturasValidas) {
    validate(servicoAssinaturasValidas, ServicoAssinaturasValidas);
    this.servicoAssinaturasValidas = servicoAssinaturasValidas;
  }

  async run(cod) {
    let assinaturas = await this.servicoAssinaturasValidas.assinaturaAtiva(cod);
      return assinaturas.map(assinatura => {
        const dataAtual = new Date();
        const dataFim = new Date (assinatura.fimVigencia);
        if (dataFim > dataAtual) {
          return true;
        } else {
          return false;
        }
      });
    }
}