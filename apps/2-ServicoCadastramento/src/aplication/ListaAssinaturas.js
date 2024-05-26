import { validate } from 'bycontract';
import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoCadastramento } from '../domain/services/ServicoCadastramento';

@Injectable()
@Dependencies(ServicoCadastramento)
export class ListaAssinaturas {
  constructor(servicoCadastramento) {
    validate(servicoCadastramento, ServicoCadastramento);
    this.servicoCadastramento = servicoCadastramento;
  }

  async run(status) {
    let assinaturas = await this.servicoCadastramento.listaAssinaturas(status);
      return await assinaturas.map(assinatura => {
        const resultado = {
          codigo: assinatura.codigo, 
          codApp: assinatura.codApp, 
          codCli: assinatura.codCli, 
          inicioVigencia: assinatura.inicioVigencia,
          fimVigencia: assinatura.fimVigencia,
        };
        if (status.tipo !== 'TODAS') {
          resultado.status = status.tipo.slice(0, -1);
        }
        return resultado;
      });
    }
}