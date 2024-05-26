import { validate } from 'bycontract';
import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoCadastramento } from '../domain/services/ServicoCadastramento';

@Injectable()
@Dependencies(ServicoCadastramento)
export class CadastrarUsuario {
  constructor(servicoCadastramento) {
    validate(servicoCadastramento, ServicoCadastramento);
    this.servicoCadastramento = servicoCadastramento;
  }
  
  async run(usuario) {
    let user = await this.servicoCadastramento.novoUsuario(usuario);
    return {
      usuario: user.usuario,
      senha: user.senha,
    }
  }

}