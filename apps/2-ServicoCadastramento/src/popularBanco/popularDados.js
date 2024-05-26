import { NestFactory } from '@nestjs/core';
import { AppModule } from '../adaptInterface/Controllers/app.module';
import { CadastrarCliente } from '../aplication/NovoCliente';
import { ClienteRepositoryORM } from '../adaptInterface/Persistence/Repositories/ClienteORM.repository';
import { AssinaturaRepositoryORM } from '../adaptInterface/Persistence/Repositories/AssinaturaORM.repository';
import { UsuarioRepositoryORM } from '../adaptInterface/Persistence/Repositories/UsuarioORM.repository';
import { AplicativoRepositoryORM } from '../adaptInterface/Persistence/Repositories/AplicativoORM.repository';
import { CadastrarAplicativo } from '../aplication/NovoAplicativo';
import { CadastrarAssinatura } from '../aplication/NovaAssinatura';
import { CadastrarUsuario } from '../aplication/NovoUsuario';


export async function droparTabelas() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const assinaturaRepository = app.get(AssinaturaRepositoryORM);
    const aplicativoRepository = app.get(AplicativoRepositoryORM);
    const clienteRepository = app.get(ClienteRepositoryORM);
    const usuarioRepository = app.get(UsuarioRepositoryORM);

    await assinaturaRepository.dropTable();
    await aplicativoRepository.dropTable();
    await clienteRepository.dropTable();
    await usuarioRepository.dropTable();

    await app.close();
}



export async function popularDados() {
    const app = await NestFactory.createApplicationContext(AppModule);
    
    const clienteService = app.get(CadastrarCliente);
    await clienteService.run({nome: 'João', email: 'joao@hotmail.com'});
    await clienteService.run({nome: 'Maria', email: 'maria@hotmail.com'});
    await clienteService.run({nome: 'Pedro', email: 'pedro@hotmail.com'});
    await clienteService.run({nome: 'Maria', email: 'maria@hotmail.com'});
    await clienteService.run({nome: 'Livia', email: 'livia@hotmail.com'});
    await clienteService.run({nome: 'Miguel', email: 'miguel@hotmail.com'});
    await clienteService.run({nome: 'Marcos', email: 'marcos@hotmail.com'});
    await clienteService.run({nome: 'Gabriel', email: 'gabriel@hotmail.com'});
    await clienteService.run({nome: 'Luana', email: 'luana@hotmail.com'});
    await clienteService.run({nome: 'Adriel', email: 'adriel@hotmail.com'});

    const aplicativoService = app.get(CadastrarAplicativo);
    await aplicativoService.run({nome: 'ComidaExpress', custoMensal: 15.90});
    await aplicativoService.run({nome: 'GameStore', custoMensal: 9.90});
    await aplicativoService.run({nome: 'CoffeTop', custoMensal: 12.90});
    await aplicativoService.run({nome: 'SaborGourmet', custoMensal: 19.90});
    await aplicativoService.run({nome: "FastShoes", custoMensal: 14.90});

    const assinaturaService = app.get(CadastrarAssinatura);
    const dataAtual = new Date();
    const dataRetroativa = new Date()
    dataRetroativa.setDate(dataAtual.getDate() - 10);
    dataAtual.setDate(dataAtual.getDate() - 3);
    await assinaturaService.run({codCli: 2, codApp: 1});
    await assinaturaService.run({codCli: 4, codApp: 2});
    await assinaturaService.run({codCli: 6, codApp: 3, inicioVigencia : new Date(dataRetroativa), fimVigencia: new Date(dataAtual)});
    await assinaturaService.run({codCli: 8, codApp: 4});
    await assinaturaService.run({codCli: 10, codApp: 5, inicioVigencia : new Date(dataRetroativa), fimVigencia: new Date(dataAtual)});

    const usuarioService = app.get(CadastrarUsuario);
    await usuarioService.run({usuario: "matias", senha: "1234"});
    
    await app.close();
}