import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController, GeneralController } from './app.controller';
import { Assinatura } from '../Persistence/Entities/Assinatura.entity';
import { Aplicativo } from '../Persistence/Entities/Aplicativo.entity';
import { Cliente } from '../Persistence/Entities/Cliente.entity';
import { Usuario } from '../Persistence/Entities/Usuario.entity';
import { AssinaturaRepositoryORM } from '../Persistence/Repositories/AssinaturaORM.repository';
import { ClienteRepositoryORM } from '../Persistence/Repositories/ClienteORM.repository';
import { IAssinaturaModelRepository } from '../../domain/repositories/AssinaturaModel.repository';
import { IClienteModelRepository } from '../../domain/repositories/ClienteModel.repository';
import { CadastrarAssinatura } from '../../aplication/NovaAssinatura';
import { AplicativoRepositoryORM } from '../Persistence/Repositories/AplicativoORM.repository';
import { IAplicativoModelRepository } from '../../domain/repositories/AplicativoModel.repository';
import { ServicoCadastramento } from '../../domain/services/ServicoCadastramento';
import { CadastrarCliente } from '../../aplication/NovoCliente';
import { ListaClientes } from '../../aplication/ListaClientes';
import { IUsuarioModelRepository } from '../../domain/repositories/UsuarioModel.repository';
import { UsuarioRepositoryORM } from '../Persistence/Repositories/UsuarioORM.repository';
import { CadastrarAplicativo } from '../../aplication/NovoAplicativo';
import { ListaAplicativos } from '../../aplication/ListaAplicativos';
import { ListaAssinaturas } from '../../aplication/ListaAssinaturas';
import { AtualizarCustoAplicativo } from '../../aplication/AtualizaCustoAplicativo';
import { AssinaturasPorCliente } from '../../aplication/AssinaturasPorCliente';
import { AssinaturasPorAplicativo } from '../../aplication/AssinaturasPorAplicativo';
import { IPoliticaAssinatura, AssinaturaTrial7D, Pagamento30D } from '../../aplication/PoliticaAssinatura';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module'; 
import { CadastrarUsuario } from '../../aplication/NovoUsuario';
import { AtualizaDataAssinatura } from '../../aplication/AtualizaDataAssinatura';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([Assinatura, Aplicativo, Cliente, Usuario]),
  ],
  
  controllers: [AppController, GeneralController],
  providers: [AssinaturaRepositoryORM, ClienteRepositoryORM, 
    AplicativoRepositoryORM, UsuarioRepositoryORM,

    IAssinaturaModelRepository, IClienteModelRepository,
    IAplicativoModelRepository, IUsuarioModelRepository,

    CadastrarAssinatura, ServicoCadastramento,
    CadastrarCliente, ListaClientes, CadastrarAplicativo, ListaAplicativos, ListaAssinaturas,
    AtualizarCustoAplicativo, AssinaturasPorCliente, AssinaturasPorAplicativo, 
    IPoliticaAssinatura, AssinaturaTrial7D, Pagamento30D, CadastrarUsuario, 
    AtualizaDataAssinatura],
})

export class AppModule {
}
