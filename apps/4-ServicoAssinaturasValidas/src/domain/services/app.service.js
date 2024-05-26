import { Injectable, Dependencies } from '@nestjs/common';

@Injectable()
@Dependencies('servicocadastramento')
export class AppService {
  #servicocadastramento;

  constructor(servicocadastramento) {
    this.#servicocadastramento = servicocadastramento;
  }

  async servicoCadastramento(tipo, dado) {
    const pattern = tipo;
    const payload = dado;
    return await this.#servicocadastramento.send(pattern, payload);
  }

}
