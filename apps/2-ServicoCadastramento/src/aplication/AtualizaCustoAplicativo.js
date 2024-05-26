import { validate } from 'bycontract';
import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoCadastramento } from '../domain/services/ServicoCadastramento';

@Injectable()
@Dependencies(ServicoCadastramento)
export class AtualizarCustoAplicativo {
  constructor(servicoCadastramento) {
    validate(servicoCadastramento, ServicoCadastramento);
    this.servicoCadastramento = servicoCadastramento;
  }

  async run(codigo, novoCusto) {
    let app = await this.servicoCadastramento.attCustoMensal(codigo, novoCusto)
    return app
  }
}