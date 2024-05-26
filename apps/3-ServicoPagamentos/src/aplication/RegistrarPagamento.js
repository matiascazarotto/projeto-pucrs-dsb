import { validate } from 'bycontract';
import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoPagamento } from '../domain/services/ServicoPagamentos';

@Injectable()
@Dependencies(ServicoPagamento)
export class RegistrarPagamento {
  constructor(servicoPagamento) {
    validate(servicoPagamento, ServicoPagamento);
    this.servicoPagamento = servicoPagamento;
  }
  
  async run(pgto) {
    let pagamento = await this.servicoPagamento.novoPagamento(pgto);
    return {
      id: pagamento.id,
      codAss: pagamento.codAss,
      valorPago: pagamento.valorPago,
      dataPagamento: pagamento.dataPagamento
    }
  }
}