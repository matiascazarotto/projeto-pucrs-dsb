import { validate } from 'bycontract';
import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoCadastramento } from '../domain/services/ServicoCadastramento';
import { InexistenteError } from '../domain/errors/TratamentoErros';

@Injectable()
@Dependencies(ServicoCadastramento)
export class CadastrarAssinatura {
  constructor(servicoCadastramento) {
    validate(servicoCadastramento, ServicoCadastramento);
    this.servicoCadastramento = servicoCadastramento;
  }

  async run(ass) {
    try {
      const assinatura = await this.servicoCadastramento.novaAssinatura(ass);
      return {
        codigo: assinatura.codigo,
        codApp: assinatura.codApp,
        codCli: assinatura.codCli,
        inicioVigencia: assinatura.inicioVigencia,
        fimVigencia: assinatura.fimVigencia
      }
    } catch (e) {
      throw new InexistenteError(e.message)
    }
  }
}