import { Injectable, Dependencies  } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from '../Entities/Usuario.entity';
import { UsuarioModel } from '../../../domain/entities/Usuario.model';
import { IUsuarioModelRepository } from '../../../domain/repositories/UsuarioModel.repository';
import { InexistenteError } from '../../../domain/errors/TratamentoErros';


@Injectable()
@Dependencies(getRepositoryToken(Usuario))
export class UsuarioRepositoryORM extends IUsuarioModelRepository{
  usuarioRep;

  constructor(usuario){
    super();
    this.usuarioRep = usuario;
  }

  async cadastrar(user) {
    let resp = await this.usuarioRep.save(user);
    return UsuarioRepositoryORM.createFromObject(resp);
  }

  async dropTable() {
    await this.usuarioRep.query('DROP TABLE IF EXISTS Usuario;');
  }

  static createFromObject({usuario, senha}){
    return new UsuarioModel(usuario, senha)
  }
}
