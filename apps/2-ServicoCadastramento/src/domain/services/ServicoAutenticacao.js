import { Injectable, Dependencies } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BuscarUsuarioAdm } from '../../aplication/BuscarUsuarioAdm';
 
@Injectable()
@Dependencies(BuscarUsuarioAdm, JwtService)
export class AuthUsuario {
    #buscarAdmin;
    #jwtService;

    constructor(buscarAdmin, jwtService) {
        this.#buscarAdmin = buscarAdmin;
        this.#jwtService = jwtService;
    }

    async validarUsuario(nome, senha) {
        const usuario = await this.#buscarAdmin.run(nome);
        if (usuario && usuario.senha === senha) {
            const { senha, ...resultado } = usuario;
            return resultado;
        }
        return null;
    }

    async login(usuario) {
        const payload = { username: usuario.usuario};
        return {
            access_token: await this.#jwtService.sign(payload),
            aviso: 'token expira em 10 minutos.'
        };
    }
}
