import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cliente } from '../Entities/Cliente.entity';
import { ClienteModel } from '../../../domain/entities/Cliente.model';
import { IClienteModelRepository } from '../../../domain/repositories/ClienteModel.repository';
import { InexistenteError } from '../../../domain/errors/TratamentoErros';

@Injectable()
@Dependencies(getRepositoryToken(Cliente))
export class ClienteRepositoryORM extends IClienteModelRepository {
  #clienteRep;

  constructor(cliente) {
    super();
    this.#clienteRep = cliente;
  }

  async todos() {
    const resp = await this.#clienteRep.find();
    if (resp.length === 0) {
      throw new InexistenteError('Não há nenhum cliente.')
    }
    return resp.map(ClienteRepositoryORM.createFromObject);
  }

  async porCodigo(codigo) {
    const resp = await this.#clienteRep.findBy({
      'codigo': codigo
    });
    if (resp.length === 0) {
      throw new InexistenteError('Não há nenhum cliente com este código.')
    }
    return resp.map(ClienteRepositoryORM.createFromObject);
  }

  async dropTable() {
    await this.#clienteRep.query('DROP TABLE IF EXISTS Cliente;');
  }

  async cadastrar(cliente) {
    let resp = await this.#clienteRep.save(cliente);
    if (!resp) {
      throw new InexistenteError('Não foi possivel cadastrar o cliente com os dados informados.')
    }
    return ClienteRepositoryORM.createFromObject(resp);
  }

  static createFromObject({ codigo, nome, email }) {
    return new ClienteModel(codigo, nome, email)
  }
}
