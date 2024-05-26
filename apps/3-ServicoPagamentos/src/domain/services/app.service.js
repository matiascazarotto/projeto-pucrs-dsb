import { Injectable, Dependencies } from '@nestjs/common';

@Injectable()
@Dependencies('servicocadastramento', 'servicoassinaturasvalidas')
export class AppService {
  #servicocadastramento;
  #servicoassinaturasvalidas;

  constructor(servicocadastramento, servicoassinaturasvalidas) {
    this.#servicocadastramento = servicocadastramento;
    this.#servicoassinaturasvalidas = servicoassinaturasvalidas;
  }

  // SERVICO CADASTRAMENTO


  async servicoCadastramento(tipo, dado) {
    const pattern = tipo;
    const payload = dado;
    return await this.#servicocadastramento.send(pattern, payload);
  }


  // SERVICO ASSINATURAS VÁLIDAS

  async servicoAssinaturasValidas(tipo, dado) {
    const pattern = tipo;
    const payload = dado;
    return await this.#servicoassinaturasvalidas.send(pattern, payload);
  }

}
