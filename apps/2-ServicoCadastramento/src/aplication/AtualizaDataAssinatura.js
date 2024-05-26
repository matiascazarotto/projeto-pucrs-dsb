import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoCadastramento } from '../domain/services/ServicoCadastramento';
import { InexistenteError } from '../domain/errors/TratamentoErros';

@Injectable()
@Dependencies(ServicoCadastramento)
export class AtualizaDataAssinatura {
  constructor(servicoCadastramento) {
    this.servicoCadastramento = servicoCadastramento;
  }

  async run(pgto) {
    try {
      let app = await this.servicoCadastramento.atualizaValidadeAssinatura(pgto)
      return app;
    } catch (error) {
      throw new InexistenteError(error.message)
    }
  }
}