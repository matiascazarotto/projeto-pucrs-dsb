import { validate } from 'bycontract';
import { Injectable, Dependencies } from '@nestjs/common';
import { PagamentoRepositoryORM } from '../../adaptInterface/Persistence/Repositories/PagamentoORM.repository';
import { IPagamentoModelRepository } from '../repositories/PagamentoModel.repository';
import { PagamentoModel } from '../entities/Pagamento.model';
import { AppService } from './app.service';
import { InexistenteError } from '../errors/TratamentoErros';


@Injectable()

@Dependencies(PagamentoRepositoryORM, AppService)
export class ServicoPagamento {
  constructor(pagamentoRepository, appService) {
    validate(pagamentoRepository, IPagamentoModelRepository);
    this.pagamentoRepository = pagamentoRepository;
    this.appService = appService;
  }

  async novoPagamento(pagamento) {
    try {
      let novoPagamento = new PagamentoModel();
      novoPagamento.codAss = pagamento.codAss;
      novoPagamento.valorPago = pagamento.valorPago;
      novoPagamento.dataPagamento = new Date(pagamento.ano, pagamento.mes - 1, pagamento.dia);
      let resp1 = await this.appService.servicoCadastramento('novoPagamento', novoPagamento);
      let resultadoResp1 = await resp1.toPromise();
      let resp2 = await this.appService.servicoAssinaturasValidas('novoPagamento', novoPagamento);
      let resultadoResp2 = await resp2.toPromise();
      return this.pagamentoRepository.registrar(novoPagamento);
    } catch (error) {
      throw new InexistenteError(error.message)
    }
  }


}