import { validate } from 'bycontract';
import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoCadastramento } from '../domain/services/ServicoCadastramento';

@Injectable()
@Dependencies(ServicoCadastramento)
export class ListaClientes {
  constructor(servicoCadastramento) {
    validate(servicoCadastramento, ServicoCadastramento);
    this.servicoCadastramento = servicoCadastramento;
  }

  async run() {
    let clientes = await this.servicoCadastramento.listaClientes();
      return clientes.map(cliente => ({codigo: cliente.codigo, email: cliente.email, nome: cliente.nome}));

  }
}