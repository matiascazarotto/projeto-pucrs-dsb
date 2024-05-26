import { validate } from 'bycontract';
import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoCadastramento } from '../domain/services/ServicoCadastramento';

@Injectable()
@Dependencies(ServicoCadastramento)
export class CadastrarAplicativo {
  constructor(servicoCadastramento) {
    validate(servicoCadastramento, ServicoCadastramento);
    this.servicoCadastramento = servicoCadastramento;
  }

  async run(novoApp) {
    let app = await this.servicoCadastramento.novoAplicativo(novoApp);

    return {
      codigo: app.codigo,
      nome: app.nome,
      custoMensal: app.custoMensal
    }
  }
}