import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Assinatura } from '../Entities/Assinatura.entity';
import { AssinaturaModel } from '../../../domain/entities/Assinatura.model';
import { IAssinaturaModelRepository } from '../../../domain/repositories/AssinaturaModel.repository';
import { MoreThan, LessThan } from '../../../../node_modules/typeorm/index';
import { InexistenteError } from '../../../domain/errors/TratamentoErros';

@Injectable()
@Dependencies(getRepositoryToken(Assinatura))
export class AssinaturaRepositoryORM extends IAssinaturaModelRepository {

  #assinaturasRep;

  constructor(assinatura) {
    super();
    this.#assinaturasRep = assinatura;
  }


  async cadastrar(assinatura) {
    let resp = await this.#assinaturasRep.save(assinatura);
    return AssinaturaRepositoryORM.createFromObject(resp);
  }

  async todos() {
    const resp = await this.#assinaturasRep.find();
    if (resp.length === 0) {
      throw new InexistenteError('Não há nenhuma assinatura.')
    }
    return resp.map(AssinaturaRepositoryORM.createFromObject);
  }

  async porClienteApp(codigo) {
    const resp = await this.#assinaturasRep.findBy({
      'codCli.codigo': codigo.codCli,
      'codApp.codigo': codigo.codApp
    });
    return resp.map(AssinaturaRepositoryORM.createFromObject);
  }

  async porCodigo(codigo) {
    const resp = await this.#assinaturasRep.findBy({
      codigo: codigo
    });
    if (resp.length === 0) {
      throw new InexistenteError('Não existe assinatura com este código.')
    }
    return resp.map(AssinaturaRepositoryORM.createFromObject);
  }


  async porCliente(codigo) {
    const resp = await this.#assinaturasRep.findBy({
      'codCli.codigo': codigo.codCli
    });
    if (resp.length === 0) {
      throw new InexistenteError('Não existe assinatura para este cliente.')
    }
    return resp.map(AssinaturaRepositoryORM.createFromObject);
  }


  async porAplicativo(codigo) {
    const resp = await this.#assinaturasRep.findBy({
      'codApp.codigo': codigo.codApp
    });
    if (resp.length === 0) {
      throw new InexistenteError('Não há assinaturas para o código de aplicativo informado, ou não há um aplicativo com este código.')
    }
    return resp.map(AssinaturaRepositoryORM.createFromObject);
  }

  async status(status) {
    const tiposAceitos = ['TODAS', 'ATIVAS', 'CANCELADAS'];
    if (!tiposAceitos.includes(status.tipo)) {
      throw new InexistenteError('Tipo de status inválido.');
    }
    else if (status.tipo === 'TODAS') {
      const resp = await this.#assinaturasRep.find();
      return resp;
    }
    else if (status.tipo === 'ATIVAS') {
      const dataAtual = new Date();
      const resp = await this.#assinaturasRep.findBy({
        fimVigencia: MoreThan(dataAtual)
      });
      return resp
    }
    else if (status.tipo === 'CANCELADAS') {
      const dataAtual = new Date();
      const resp = await this.#assinaturasRep.findBy({
        fimVigencia: LessThan(dataAtual)
      });
      return resp
    }
  };

  async atualiza(codAss, dataFim) {
    let ok = await this.#assinaturasRep
      .createQueryBuilder()
      .update(Assinatura)
      .set({
        fimVigencia: dataFim,
      })
      .where({
        codigo: codAss,
      })
      .execute();
    return ok;
  }

  async dropTable() {
    await this.#assinaturasRep.query('DROP TABLE IF EXISTS Assinatura;');
  }

  static createFromObject({ codigo, codApp, codCli, inicioVigencia, fimVigencia }) {
    let assinaturaModel = new AssinaturaModel();
    assinaturaModel.codigo = codigo;
    assinaturaModel.codApp = codApp;
    assinaturaModel.codCli = codCli;
    assinaturaModel.inicioVigencia = inicioVigencia;
    assinaturaModel.fimVigencia = fimVigencia;
    return assinaturaModel;
  }
}
