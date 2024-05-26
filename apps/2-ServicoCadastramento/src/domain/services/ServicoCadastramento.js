import { validate } from 'bycontract';
import { Injectable, Dependencies } from '@nestjs/common';
import { AssinaturaModel } from '../entities/Assinatura.model';
import { IAssinaturaModelRepository } from '../repositories/AssinaturaModel.repository';
import { IClienteModelRepository } from '../repositories/ClienteModel.repository';
import { IAplicativoModelRepository } from '../repositories/AplicativoModel.repository';
import { ClienteModel } from '../entities/Cliente.model';
import { AssinaturaRepositoryORM } from '../../adaptInterface/Persistence/Repositories/AssinaturaORM.repository';
import { ClienteRepositoryORM } from '../../adaptInterface/Persistence/Repositories/ClienteORM.repository';
import { AplicativoRepositoryORM } from '../../adaptInterface/Persistence/Repositories/AplicativoORM.repository';
import { AplicativoModel } from '../entities/Aplicativo.model';
import { Pagamento30D, IPoliticaAssinatura, AssinaturaTrial7D } from '../../aplication/PoliticaAssinatura';
import { InexistenteError } from '../errors/TratamentoErros';
import { UsuarioRepositoryORM } from '../../adaptInterface/Persistence/Repositories/UsuarioORM.repository';
import { IUsuarioModelRepository } from '../repositories/UsuarioModel.repository';
import { UsuarioModel } from '../entities/Usuario.model';


@Injectable()

@Dependencies(AssinaturaRepositoryORM, ClienteRepositoryORM, AplicativoRepositoryORM,
  AssinaturaTrial7D, Pagamento30D, UsuarioRepositoryORM)
export class ServicoCadastramento {

  constructor(assinaturaRepository, clienteRepository, aplicativoRepository,
    periodoTrial, periodoPagamento, usuarioRepository) {

    validate(assinaturaRepository, IAssinaturaModelRepository);
    validate(clienteRepository, IClienteModelRepository);
    validate(aplicativoRepository, IAplicativoModelRepository);
    validate(periodoTrial, IPoliticaAssinatura);
    validate(periodoPagamento, IPoliticaAssinatura);
    validate(usuarioRepository, IUsuarioModelRepository);

    this.assinaturaRepository = assinaturaRepository;
    this.clienteRepository = clienteRepository;
    this.aplicativoRepository = aplicativoRepository;
    this.periodoTrial = periodoTrial;
    this.periodoPagamento = periodoPagamento;
    this.usuarioRepository = usuarioRepository;

  }


  //Assinaturas
  async novaAssinatura(assinatura) {

    const existeCliente = await this.clienteRepository.porCodigo(assinatura.codCli)
    const existeAplicativo = await this.aplicativoRepository.existe(assinatura.codApp)
    const porClienteApp = await this.assClienteApp(assinatura);

    if (existeCliente && existeAplicativo) {
      if (porClienteApp.length === 0) {
        let novaAssinatura = new AssinaturaModel();
        let freeTrialdays = await this.periodoTrial.trial();
        novaAssinatura.codApp = assinatura.codApp;
        novaAssinatura.codCli = assinatura.codCli;
        if (assinatura.inicioVigencia === undefined) {
          let dataAtual = new Date();
          let dataFim = new Date();
          dataFim.setDate(dataAtual.getDate() + freeTrialdays);
          novaAssinatura.inicioVigencia = dataAtual;
          novaAssinatura.fimVigencia = dataFim;
        } else {
          novaAssinatura.inicioVigencia = assinatura.inicioVigencia;
          novaAssinatura.fimVigencia = assinatura.fimVigencia;
        }
        return this.assinaturaRepository.cadastrar(novaAssinatura);
      }
      else {
        throw new InexistenteError('Não foi possivel criar uma nova assinatura.')
        ;
      }
    } else {
      if (!existeCliente) {
        throw new InexistenteError('Código para cliente informado não existe.')
      }
      throw new InexistenteError('Código para aplicativo informado não existe.')
      ;
    }
  }

  async listaAssinaturas(status) {
    return await this.assinaturaRepository.status(status);
  }

  async assinaturasCliente(codigo) {
    return await this.assinaturaRepository.porCliente(codigo);
  }

  async assinaturasAplicativo(codigo) {
    return await this.assinaturaRepository.porAplicativo(codigo);
  }
  async assClienteApp(codigo) {
    return await this.assinaturaRepository.porClienteApp(codigo);
  }

  async atualizaValidadeAssinatura(pgto) {
    const assinatura = await this.assinaturaRepository.porCodigo(pgto.codAss);
    if (assinatura) {
      const incrementarPrazo = this.periodoPagamento.pagamento();
      const vigenciaAtual = new Date(assinatura[0].fimVigencia);
      const dataAtual = new Date();
      let vigenciaNova;

      if (vigenciaAtual > dataAtual) {                                              // VERIFICA SE A VIGENCIA ATUAL DA ASSINATURA É MAIOR QUE A DATA ATUAL                                                                                  
        vigenciaNova = new Date(vigenciaAtual);                                     // SE SIM, INCREMENTA O PRAZO A PARTIR DA VIGENCIA JÁ EXISTENTE, PARA NÃO PERDER O PERIODO RESTANTE.
        vigenciaNova.setDate(vigenciaNova.getDate() + incrementarPrazo);            // SE NAO, INCREMENTA O PRAZO A PARTIR DA DATA ATUAL. 
      } else {
        vigenciaNova = new Date(dataAtual);
        vigenciaNova.setDate(vigenciaNova.getDate() + incrementarPrazo);
      }

      const atualizar = await this.assinaturaRepository.atualiza(pgto.codAss, vigenciaNova);
      return atualizar;

    } else {
      throw new InexistenteError('Assinatura não encontrada');
    }
  }



  //Clientes
  async listaClientes() {
    return await this.clienteRepository.todos();
  }

  async novoCliente(cliente) {
    let novoCliente = new ClienteModel();
    novoCliente.email = cliente.email;
    novoCliente.nome = cliente.nome;
    return await this.clienteRepository.cadastrar(novoCliente);
  }


  //Aplicativos
  async listaAplicativos() {
    return await this.aplicativoRepository.todos();
  }

  async novoAplicativo(app) {
    let novoApp = new AplicativoModel();
    novoApp.nome = app.nome;
    novoApp.custoMensal = app.custoMensal;
    return await this.aplicativoRepository.cadastrar(novoApp);
  }

  async attCustoMensal(codigo, novoCusto) {
    const existe = await this.aplicativoRepository.existe(codigo)
    if (!existe) {
      throw new InexistenteError('Aplicativo informado não existe.')
    }
    return await this.aplicativoRepository.atualizaCustoMensal(codigo, novoCusto);
  }

  //Usuarios

  async novoUsuario(user) {
    let novoUsuario = new UsuarioModel();
    novoUsuario.usuario = user.usuario;
    novoUsuario.senha = user.senha;
    return await this.usuarioRepository.cadastrar(novoUsuario);
  }

  async buscarUsuarioAdm(nome) {
    return await this.usuarioRepository.buscarAdm(nome);
  }

}
