import { Controller, Dependencies, Get, Post, Bind, Body, Param, Patch, Request, HttpCode, HttpStatus, Res, NotFoundException, ParseIntPipe, UsePipes, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthUsuario } from './auth/ServicoAutenticacao';
import { InexistenteError } from './TratamentoErros';
import { NovoClienteValidatorPipe } from './validates/assinatura.validator';
import { CriarAplicativoValidatorPipe } from './validates/aplicativo.validator';
import { CriarAssinaturaValidatorPipe } from './validates/cliente.validator';
import { CriarPagamentoValidatorPipe } from './validates/pagamento.validator';


@Controller()
@Dependencies(AppService, AuthUsuario)
export class AppController {
  #appService;
  #authUsuario;

  constructor(appService, authUsuario) {
    this.#appService = appService;
    this.#authUsuario = authUsuario;
  }

  //CLIENTES
  @Get("servcad/clientes")    // VERIFICA TODOS OS CLIENTES
  async getClientes() {
    return await this.#appService.servicoCadastramento2('getClientes')
  }

  @UseGuards(JwtAuthGuard)
  @Post("servcad/novoCliente")    // REGISTRA NOVO CLIENTE
  @Bind(Body())
  @UsePipes(NovoClienteValidatorPipe)
  async cadastrarCliente(cliente) {
    return await this.#appService.servicoCadastramento('cadastrarCliente', cliente)
  }

  //APLICATIVOS
  @Get("servcad/aplicativos")    // VERIFICA TODOS OS APLICATIVOS
  async getAplicativos() {
    return await this.#appService.servicoCadastramento2('getAplicativos')
  }


  @UseGuards(JwtAuthGuard)
  @Post("servcad/novoAplicativo") // REGISTRA NOVO APLICATIVO (NECESSITA AUTHENTICACAO)
  @Bind(Body())
  @UsePipes(CriarAplicativoValidatorPipe)
  async cadastrarApp(app) {
    return await this.#appService.servicoCadastramento('cadastrarApp', app)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('servcad/aplicativos/:id')   // ALTERA CUSTO DO APLICATIVO (NECESSITA AUTHENTICACAO)
  @Bind(Param('id', ParseIntPipe), Body(), Res({ passthrough: true }))
  async attCustoMensal(codigo, novoCusto, res) {
    try {
      const app = await this.#appService.servicoCadastramento('attCustoMensal', { codigo, novoCusto })
      const resultado = await app.toPromise();
      res.status(200).json(resultado);
    } catch (error) {
      res.status(404).json({ status: 'error', details: error.message });
    }
  }

  //ASSINATURAS
  @UseGuards(JwtAuthGuard)
  @Post("servcad/assinatura")     // REGISTRA NOVA ASSINATURA (NECESSITA AUTHENTICACAO)
  @Bind(Body(), Res({ passthrough: true }))
  @UsePipes(CriarAssinaturaValidatorPipe)
  async cadastrarAssinatura(assinatura, res) {
    try {
      const novaAssinatura = await this.#appService.servicoCadastramento('cadastrarAssinatura', assinatura)
      const resultado = await novaAssinatura.toPromise();
      res.status(200).json(resultado);
    } catch (error) {
      res.status(404).json({ status: 'error', details: error.message });
    }
  }

  @Get("servcad/assinaturas/:tipo")   // VERIFICA STATUS POR TIPO (ATIVAS/CANCELADAS)
  @Bind(Param(), Res({ passthrough: true }))
  async getAssinaturas(status, res) {
    try {
      const assinatura = await this.#appService.servicoCadastramento('getAssinaturas', status)
      const resultado = await assinatura.toPromise();
      res.status(200).json(resultado);
    } catch (error) {
      res.status(404).json({ status: 'error', details: error.message });
    }
  }


  @Get("servcad/asscli/:codCli")      // VERIFICA ASSINATURAS DE DETERMINADO CLIENTE
  @Bind(Param(), Res({ passthrough: true }))
  async getAssinaturasCliente(codigo, res) {
    try {
      const assinatura = await this.#appService.servicoCadastramento('getAssinaturasCliente', codigo)
      const resultado = await assinatura.toPromise();
      res.status(200).json(resultado);
    } catch (error) {
      res.status(404).json({ status: 'error', details: error.message });
    }
  }

  @Get("servcad/assapp/:codApp")
  @Bind(Param(), Res({ passthrough: true }))
  async getAssinaturasApp(codigo, res) {
    try {
      const assinatura = await this.#appService.servicoCadastramento('getAssinaturasApp', codigo);
      const resultado = await assinatura.toPromise();
      res.status(200).json(resultado);
    } catch (error) {
      res.status(404).json({ status: 'error', details: error.message });
    }
  }

  @Get("assinvalidas/:codAss")      // VERIFICA ASSINATURAS POR CODIGO
  @Bind(Param(), Res({ passthrough: true }))
  async getAssinaturaValida(codigo, res) {
    try {
      const assinatura = await this.#appService.servicoAssinaturasValidas('getAssinaturaValida', codigo)
      const resultado = await assinatura.toPromise();
      res.status(200).json(resultado);
    } catch (error) {
      res.status(404).json({ status: 'error', details: error.message });
    }
  }

  //PAGAMENTOS
  @UseGuards(JwtAuthGuard)
  @Post("registrarpagamento")     // REGISTRA UM PAGAMENTO (NECESSITA AUTHENTICACAO)
  @Bind(Body(), Res({ passthrough: true }))
  @UsePipes(CriarPagamentoValidatorPipe)
  async novoPagamento(pgto, res) {
    try {
      const pagamento = await this.#appService.servicoPagamentos('novoPagamento', pgto)
      const resultado = await pagamento.toPromise();
      res.status(200).json(resultado);
    } catch (error) {
      res.status(404).json({ status: 'error', details: error.message });
    }
  }

  //USUARIO/ADMIN
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')        // FAZ LOGIN PARA OBTER O TOKEN DE AUTHENTICACAO
  @Bind(Request())
  async login(req) {
    return await this.#authUsuario.login(req.user);
  }

}
