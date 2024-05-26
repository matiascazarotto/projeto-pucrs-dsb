import { validate } from 'bycontract';
import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoCadastramento } from '../domain/services/ServicoCadastramento';

@Injectable()
@Dependencies(ServicoCadastramento)
export class AssinaturasPorAplicativo {
  constructor(servicoCadastramento) {
    validate(servicoCadastramento, ServicoCadastramento);
    this.servicoCadastramento = servicoCadastramento;
  }

  async run(cod) {
    let assinaturas = await this.servicoCadastramento.assinaturasAplicativo(cod);
      return assinaturas.map(assinatura => {
        const dataAtual = new Date();
        const dataFim = new Date (assinatura.fimVigencia);
        const resultado = {
          codigo: assinatura.codigo, 
          codApp: assinatura.codApp, 
          codCli: assinatura.codCli, 
          inicioVigencia: assinatura.inicioVigencia,
          fimVigencia: assinatura.fimVigencia,
        };
        if (dataFim > dataAtual) {
          resultado.status = 'ATIVA'
        } else {
          resultado.status = 'CANCELADA'
        }
        return resultado;
      });
    }
}