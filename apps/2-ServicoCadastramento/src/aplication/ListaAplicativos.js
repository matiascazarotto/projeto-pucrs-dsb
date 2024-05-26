import { validate } from 'bycontract';
import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoCadastramento } from '../domain/services/ServicoCadastramento';

@Injectable()
@Dependencies(ServicoCadastramento)
export class ListaAplicativos {
  constructor(servicoCadastramento) {
    validate(servicoCadastramento, ServicoCadastramento);
    this.servicoCadastramento = servicoCadastramento;
  }

  async run() {
    let apps = await this.servicoCadastramento.listaAplicativos();
      return apps.map(app => ({codigo: app.codigo, nome: app.nome, custoMensal: app.custoMensal}));

  }
}