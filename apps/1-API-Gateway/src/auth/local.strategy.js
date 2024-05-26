import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Dependencies } from '@nestjs/common';
import { AuthUsuario } from './ServicoAutenticacao';
import { Strategy } from 'passport-local'

@Injectable()
@Dependencies(AuthUsuario)
export class LocalStrategy extends PassportStrategy(Strategy) {
    authUsuario;

    constructor(authUsuario) {
        super();
        this.authUsuario = authUsuario;
    }

    async validate(nome, senha) {
        try {
            const usuario = await this.authUsuario.validarUsuario(nome, senha);
            return usuario;
        } catch (error) {
            if (!usuario) {
                throw new UnauthorizedException();
            }
            console.log(error)
        }
    }
}
