import { validate } from 'bycontract';
import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoCadastramento } from '../domain/services/ServicoCadastramento';

@Injectable()
@Dependencies(ServicoCadastramento)
export class CadastrarCliente {
  constructor(servicoCadastramento) {
    validate(servicoCadastramento, ServicoCadastramento);
    this.servicoCadastramento = servicoCadastramento;
  }

  async run(novoCliente) {
    let cliente = await this.servicoCadastramento.novoCliente(novoCliente);

    return {
      codigo: cliente.codigo,
      email: cliente.email,
      nome: cliente.nome
    }
  }
}