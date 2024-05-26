import { Controller, Dependencies, Get, NotFoundException} from '@nestjs/common';
import { CadastrarAssinatura } from '../../aplication/NovaAssinatura';
import { CadastrarCliente } from '../../aplication/NovoCliente';
import { ListaClientes } from '../../aplication/ListaClientes';
import { CadastrarAplicativo } from '../../aplication/NovoAplicativo';
import { ListaAplicativos } from '../../aplication/ListaAplicativos';
import { ListaAssinaturas } from '../../aplication/ListaAssinaturas';
import { AtualizarCustoAplicativo } from '../../aplication/AtualizaCustoAplicativo';
import { AssinaturasPorCliente } from '../../aplication/AssinaturasPorCliente';
import { AssinaturasPorAplicativo } from '../../aplication/AssinaturasPorAplicativo';
import { InexistenteError } from '../../domain/errors/TratamentoErros';
import { EventPattern, MessagePattern, RpcException } from '@nestjs/microservices';
import { AtualizaDataAssinatura } from '../../aplication/AtualizaDataAssinatura';

@Controller('')
@Dependencies()
export class GeneralController {
  constructor(appService) {
    this.appService = appService;
  }

  @Get()
  getHello() {
    return 'Aplicação de Assinaturas';
  }
}

@Controller('')
@Dependencies(CadastrarAssinatura, CadastrarCliente,
  ListaClientes, ListaAplicativos, CadastrarAplicativo,
  ListaAssinaturas, AtualizarCustoAplicativo, AssinaturasPorCliente,
  AssinaturasPorAplicativo, AtualizaDataAssinatura)
export class AppController {
  constructor(novaAssinatura, novoCliente,
    todosOsClientes, todosOsAplicativos, novoAplicativo,
    todasAsAssinaturas, attCustoAplicativo, assinaturasCliente,
    assinaturasAplicativo, attDataAssinatura) {
    this.novaAssinatura = novaAssinatura;
    this.novoCliente = novoCliente;
    this.novoAplicativo = novoAplicativo;
    this.todosOsClientes = todosOsClientes;
    this.todosOsAplicativos = todosOsAplicativos;
    this.todasAsAssinaturas = todasAsAssinaturas;
    this.attCustoAplicativo = attCustoAplicativo;
    this.assinaturasCliente = assinaturasCliente;
    this.assinaturasAplicativo = assinaturasAplicativo;
    this.attDataAssinatura = attDataAssinatura;
  }

  // EVENTO OBSERVA PAGAMENTO
  @EventPattern('novoPagamento')
  async eventoPagamento(pgto) {
    try {
      return await this.attDataAssinatura.run(pgto);
    } catch (error) {
      if (error instanceof InexistenteError) {
        throw new RpcException({
          status: 'error',
          message: error.message,
        });
      }
    }
  }

  //CLIENTES
  @MessagePattern('getClientes')      // VERIFICA TODOS OS CLIENTES
  async getClientes() {
    try {
      return await this.todosOsClientes.run();
    } catch (error) {
      if (error instanceof InexistenteError) {
        throw new NotFoundException('Não há clientes cadastrados.', {
          cause: error
        });
      }
      throw error;
    }
  }

  @MessagePattern('cadastrarCliente') // REGISTRA NOVO CLIENTE
  async cadastrarCliente(cliente) {
    return this.novoCliente.run(cliente);
  }

  //APLICATIVOS
  @MessagePattern('getAplicativos') // VERIFICA TODOS OS APLICATIVOS 
  async getAplicativos() {
    return this.todosOsAplicativos.run();
  }

  @MessagePattern('cadastrarApp') // REGISTRA NOVO APLICATIVO
  async cadastrarApp(app) {
    return this.novoAplicativo.run(app);
  }


  @MessagePattern('attCustoMensal') // ALTERA CUSTO DO APLICATIVO 
  async attCustoMensal(dado) {
    try {
      return await this.attCustoAplicativo.run(dado.codigo, dado.novoCusto);
    } catch (error) {
      if (error instanceof InexistenteError) {
        throw new RpcException({
          status: 'error',
          message: error.message,
        });
      }
    }
  }

  //ASSINATURAS
  @MessagePattern('cadastrarAssinatura')     // REGISTRA NOVA ASSINATURA 
  async cadastrarAssinatura(assinatura) {
    try {
      return await this.novaAssinatura.run(assinatura);
    } catch (error) {
      if (error instanceof InexistenteError) {
        throw new RpcException({
          status: 'error',
          message: error.message,
        });
      }
    }
  }

  @MessagePattern('getAssinaturas')     // VERIFICA STATUS POR TIPO (ATIVAS/CANCELADAS)
  async getAssinaturas(status) {
    try {
      return await this.todasAsAssinaturas.run(status);
    } catch (error) {
      if (error instanceof InexistenteError) {
        throw new RpcException({
          status: 'error',
          message: error.message,
        });
      }
    }
  }


  @MessagePattern('getAssinaturasCliente') // VERIFICA ASSINATURAS DE DETERMINADO CLIENTE
  async getAssinaturasCliente(codigo) {
    try {
      return await this.assinaturasCliente.run(codigo);
    } catch (error) {
      if (error instanceof InexistenteError) {
        throw new RpcException({
          status: 'error',
          message: error.message,
        });
      }
    }
  }

  @MessagePattern('getAssinaturasApp')      // VERIFICA ASSINATURAS DE DETERMINADO APLICATIVO
  async getAssinaturasApp(codigo) {
    try {
      return await this.assinaturasAplicativo.run(codigo);
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