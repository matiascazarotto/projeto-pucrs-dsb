import { Injectable, Dependencies } from '@nestjs/common';
import { InexistenteError } from './TratamentoErros';
import { RpcException } from '@nestjs/microservices';

@Injectable()
@Dependencies('servicocadastramento', 'servicoassinaturasvalidas', 'servicopagamentos')
export class AppService {
  #servicocadastramento;
  #servicoassinaturasvalidas;
  #servicopagamentos;

  constructor(servicocadastramento, servicoassinaturasvalidas, servicopagamentos) {
    this.#servicocadastramento = servicocadastramento;
    this.#servicoassinaturasvalidas = servicoassinaturasvalidas;
    this.#servicopagamentos = servicopagamentos;
  }

  // SERVICO CADASTRAMENTO
  async servicoCadastramento(tipo, dado) {
    const pattern = tipo;
    const payload = dado;
    return await this.#servicocadastramento.send(pattern, payload);
  }

  async servicoCadastramento2(tipo) {
    const pattern = tipo;
    const payload = tipo;
    return await this.#servicocadastramento.send(pattern, payload);
  }


  // SERVICO PAGAMENTOS
  async servicoPagamentos(tipo, dado) {
    const pattern = tipo;
    const payload = dado;
    return await this.#servicopagamentos.send(pattern, payload);
  }

  // SERVICO ASSINATURAS VÁLIDAS

  async servicoAssinaturasValidas(tipo, dado) {
    const pattern = tipo;
    const payload = dado;
    return await this.#servicoassinaturasvalidas.send(pattern, payload);
  }




  // async enviarEvento() {
  //   const pattern = 'NovoPagamentoRegistrado';
  //   const payload = 'apigateway';
  //   this.#servicocadastramento.emit(pattern, payload);
  // }
}
