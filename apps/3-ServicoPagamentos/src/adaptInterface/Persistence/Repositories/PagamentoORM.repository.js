import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IPagamentoModelRepository } from '../../../domain/repositories/PagamentoModel.repository';
import { Pagamento } from '../Entities/Pagamento.entity';
import { PagamentoModel } from '../../../domain/entities/Pagamento.model';

@Injectable()
@Dependencies(getRepositoryToken(Pagamento))
export class PagamentoRepositoryORM extends IPagamentoModelRepository {
  #pagamentoRep;

  constructor(pagamento) {
    super();
    this.#pagamentoRep = pagamento;
  }

  async todos() {
    const resp = await this.#pagamentoRep.find();
    return resp.map(PagamentoRepositoryORM.createFromObject);
  }

  async dropTable() {
    await this.#pagamentoRep.query('DROP TABLE IF EXISTS Pagamento;');
  }

  async registrar(pagamento) {
    let resp = await this.#pagamentoRep.save(pagamento);
    return PagamentoRepositoryORM.createFromObject(resp);
  }

  static createFromObject({ id, codAssinatura, valorPago, dataPagamento }) {
    let pgtoModel = new PagamentoModel();
    pgtoModel.id = id;
    pgtoModel.codAss = codAssinatura;
    pgtoModel.valorPago = valorPago;
    pgtoModel.dataPagamento = dataPagamento;
    return pgtoModel;
  }
}
