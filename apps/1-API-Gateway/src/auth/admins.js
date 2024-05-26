import { Injectable, Dependencies } from '@nestjs/common';
@Injectable()
@Dependencies()
export class Admins{

  constructor(){
    this.admins = [
      {
        usuario: 'matias',
        senha: '1234',
      }
    ]
  }


  async buscarAdm(nome) {
    const usuario = this.admins.find(usuario => usuario.usuario === nome);
    return usuario;
  }
}