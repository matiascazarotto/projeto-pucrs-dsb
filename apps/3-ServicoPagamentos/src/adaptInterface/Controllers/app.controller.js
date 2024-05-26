import { Controller, Dependencies, Get, Post, Bind, Body } from '@nestjs/common';
import { RegistrarPagamento } from '../../aplication/RegistrarPagamento';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { InexistenteError } from '../../domain/errors/TratamentoErros';

@Controller('')
@Dependencies()
export class GeneralController {
  constructor(appService) {
    this.appService = appService;
  }

  @Get()
  getHello() {
    return 'Serviço de Pagamentos';
  }
}

@Controller('')
@Dependencies(RegistrarPagamento)
export class AppController {
  constructor(registrarPagamento) {
    this.registrarPagamento = registrarPagamento;
  }

  @MessagePattern('novoPagamento')
  @Post("registrarpagamento")     // REGISTRA UM PAGAMENTO (NECESSITA AUTHENTICACAO)
  @Bind(Body())
  async novoPagamento(pgto) {
    try {
      return await this.registrarPagamento.run(pgto);
    } catch (error) {
      if (error instanceof InexistenteError) {
        throw new RpcException({
          status: 'error',
          message: error.message,
        });
      }
    }
  }
}