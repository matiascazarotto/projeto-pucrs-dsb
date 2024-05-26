import { Controller, Dependencies, Get, Post, Bind, Body, Param, Patch, Request, HttpCode, HttpStatus, Res, NotFoundException, ParseIntPipe, UsePipes, UseGuards } from '@nestjs/common';
import { EventPattern, MessagePattern, RpcException } from '@nestjs/microservices';
import { AssinaturasPorCodigo } from '../../aplication/AssinaturasPorCod';
import { AttBancoLocal } from '../../aplication/AtualizaBancoLocal';
import { InexistenteError } from '../../domain/errors/TratamentoErros';

@Controller('')
@Dependencies()
export class GeneralController {
  constructor(appService) {
    this.appService = appService;
  }

  @Get()
  getHello() {
    return 'Serviço de Assinaturas Válidas';
  }
}


@Controller('')
@Dependencies(AssinaturasPorCodigo, AttBancoLocal)
export class AppController {
  constructor(assinaturasPorCodigo, attBancoLocal) {
    this.assinaturasPorCodigo = assinaturasPorCodigo;
    this.attBancoLocal = attBancoLocal;
  }

  // EVENTO OBSERVA PAGAMENTO
  @EventPattern('novoPagamento')                    // Ao receber a notificação de um novo pagamento
  async eventoPagamento(pgto) {                     // executa esta função que atualiza o banco de dados local.
    return await this.attBancoLocal.run(pgto);
  }


  // VERIFICA ASSINATURA VALIDA
  @MessagePattern('getAssinaturaValida')
  async getAplicativos(cod) {
    try {
      return await this.assinaturasPorCodigo.run(cod.codAss);
    } catch (error) {
      if (error instanceof InexistenteError) {
        throw new RpcException({
          status: 'error',
          message: 'Não encontrado.',
          details: error.message,
        });
      }
    }
  }
}