import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Assinatura } from '../Entities/Assinatura.entity';
import { AssinaturaModel } from '../../../domain/entities/Assinatura.model';
import { IAssinaturaModelRepository } from '../../../domain/repositories/AssinaturaModel.repository';
import { MoreThan, LessThan } from '../../../../node_modules/typeorm/index';
import { validate } from 'bycontract';
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
    await this.#assinaturasRep.clear();
    let resp = await this.#assinaturasRep.save(assinatura);
    return AssinaturaRepositoryORM.createFromObject(resp);
  }

  async populaDB(assinatura) {
    let resp = await this.#assinaturasRep.save(assinatura);
    return AssinaturaRepositoryORM.createFromObject(resp);
  }


  async porCodigo(codigo) {
    const resp = await this.#assinaturasRep.findBy({
      codigo: codigo
    });
    if (resp.length === 0) {
      throw new InexistenteError('Não existe assinatura com este código.')
    }
    return resp
  }

  
  async status(status) {
    if (status.tipo === 'TODAS') {
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
