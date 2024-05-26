import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IAplicativoModelRepository } from '../../../domain/repositories/AplicativoModel.repository';
import { Aplicativo } from '../Entities/Aplicativo.entity';
import { AplicativoModel } from '../../../domain/entities/Aplicativo.model';

@Injectable()
@Dependencies(getRepositoryToken(Aplicativo))
export class AplicativoRepositoryORM extends IAplicativoModelRepository {
  #aplicativoRep;

  constructor(aplicativo) {
    super();
    this.#aplicativoRep = aplicativo;
  }

  async todos() {
    const resp = await this.#aplicativoRep.find();
    return resp.map(AplicativoRepositoryORM.createFromObject);
  }

  async existe(codigo) {
    const contagem = await this.#aplicativoRep.createQueryBuilder('aplicativo')
        .where('aplicativo.codigo = :codigo', {codigo})
        .getCount();
    return contagem > 0;
  }
  async dropTable() {
    await this.#aplicativoRep.query('DROP TABLE IF EXISTS Aplicativo;');
  }

  async cadastrar(app) {
    let resp = await this.#aplicativoRep.save(app);
    return AplicativoRepositoryORM.createFromObject(resp);
  }

  async atualizaCustoMensal(codigo, novoCusto) {
    let app = await this.#aplicativoRep
      .createQueryBuilder()
      .update(Aplicativo)
      .set({
        custoMensal: novoCusto.custoMensal,
      })
      .where({
        codigo: codigo
      })
      .execute();

    let appAtt = await this.#aplicativoRep.findBy({
      codigo: codigo
    });
    return appAtt;
  }

  static createFromObject({ codigo, nome, custoMensal }) {
    let appModel = new AplicativoModel();
    appModel.codigo = codigo;
    appModel.nome = nome;
    appModel.custoMensal = custoMensal;
    return appModel;
  }
}
