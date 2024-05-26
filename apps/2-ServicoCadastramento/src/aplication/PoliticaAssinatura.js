import { Injectable } from '@nestjs/common';


export class IPoliticaAssinatura {
  trial() {}
  pagamento() {}
}

@Injectable()
export class AssinaturaTrial7D extends IPoliticaAssinatura {
    trial () {
      let dias = 7;
      return dias;
    }
}

@Injectable()
export class Pagamento30D extends IPoliticaAssinatura {
   pagamento () {
    let dias = 30;
    return dias;
  }
}